import type { Metadata } from "next";
import { Ubuntu, Raleway, Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/Layout";
import { AppProvider } from "@/context/AppContext";
import { ThemeWrapper } from "@/utils/themeWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ClientErrorBoundaryWrapper from "@/components/ClientErrorBoundaryWrapper";

const headingFont = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
});

const subHeadingFont = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const textFont = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Zingvel - Your Travel Companion",
  description: "Discover amazing travel destinations and packages with Zingvel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.className} ${subHeadingFont.className} ${textFont.className}`}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AuthProvider>
              <ThemeWrapper>
                <CssBaseline />
                <AppProvider>
                  <ClientErrorBoundaryWrapper>
                    <Layout>{children}</Layout>
                  </ClientErrorBoundaryWrapper>
                </AppProvider>
              </ThemeWrapper>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
