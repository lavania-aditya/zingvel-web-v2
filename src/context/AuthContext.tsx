"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { sendOtpService, verifyOtpSerive, getUserFromTokenApi } from "@/services/SUser";
import Cookies from "js-cookie";

interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  countryCode: number;
  phNumber: string;
  phVerified: boolean;
  avatarImage?: string;
  email: string | null;
  emailVerified: boolean;
  bio: string | null;
  gender: string;
  typeOfTravel: string[] | null;
  placesTravelledYear: string[] | null;
  dateOfBirth: string | null;
  totalWanderlist?: number;
  totalPost?: number;
  totalTravel?: number;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<boolean>;
  logout: () => void;
  verifyOTP: (phoneNumber: string, otp: string, firstName?: string, lastName?: string, email?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in from auth token
  useEffect(() => {
    const checkUserAuth = async () => {
      const authToken = Cookies.get("AUTH_TOKEN");
      if (authToken) {
        try {
          // Try to get user from cookies first
          const userFromCookies = Cookies.get("AUTH_USER");
          if (userFromCookies) {
            try {
              const parsedUser = JSON.parse(userFromCookies);
              setUser(parsedUser);
              return;
            } catch {
              console.error("Failed to parse user from cookies");
            }
          }

          // If no user in cookies or parsing failed, fetch from API
          const response = await getUserFromTokenApi();
          if (response && response.data) {
            setUser(response.data);
            // Store user in cookies
            Cookies.set("AUTH_USER", JSON.stringify(response.data), { expires: 7 });
          }
        } catch (error) {
          console.error("Failed to get user data:", error);
          Cookies.remove("AUTH_TOKEN");
          Cookies.remove("AUTH_USER");
        }
      }
    };

    checkUserAuth();
  }, []);

  const login = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Call the send OTP API
      await sendOtpService(91, phoneNumber);
      return true;
    } catch (error) {
      console.error("Failed to send OTP:", error);
      return false;
    }
  };

  const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
    try {
      // Call the verify OTP API
      const response = await verifyOtpSerive(91, phoneNumber, otp);
      debugger;
      if (response && response.user && response.token) {
        // Set user data and auth token
        setUser(response.user);

        // Store auth token and user data in cookies
        if (response.token) {
          Cookies.set("AUTH_TOKEN", response.token, { expires: 7 }); // 7 days expiry
          Cookies.set("AUTH_USER", JSON.stringify(response.user), { expires: 7 }); // 7 days expiry
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("OTP verification failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("AUTH_TOKEN");
    Cookies.remove("AUTH_USER");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
