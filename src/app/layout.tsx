import type { Metadata } from "next";
import { Lato, Nunito, Ubuntu, Raleway } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/Layout";
import { AppProvider } from "@/context/AppContext";
import { ThemeWrapper } from "@/utils/themeWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ClientErrorBoundaryWrapper from "@/components/ClientErrorBoundaryWrapper";

const ubuntuFont = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
});

const ralewayFont = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

// const nunitoFontM = Montserrat({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin", "latin-ext"],
// });

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
      <body className={`${ubuntuFont.className} ${ralewayFont.className}`}>
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
