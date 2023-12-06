"use client";

import { Inter } from "next/font/google";
import "./globals.scss";
import { useEffect, useState, ReactNode, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TabProvider } from "@/providers/TabProvider";
import { Layout } from "@/components/shared/layout";
import { Loader, LoaderType } from "@progress/kendo-react-indicators";
import ThemeProvider from "@/providers/ThemeProvider";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    const isHomePage = pathname.indexOf("front") > -1;
    const isLoginPage = pathname.indexOf("login") > -1;
    console.log(999, pathname, isLogin, isLoginPage, !isLoaded && !isLoginPage && isLogin);

    if (!isLogin && !isLoginPage) {
      setIsLogin(false);
      setIsLoginPage(true);
      router.push("/login");
    } else if (isLogin && (isHomePage || isLoginPage)) {
      setIsLogin(true);
      setIsLoginPage(false);
      router.push("/front");
    } else if (isLogin && !isHomePage && !isLoginPage) {
      setIsLogin(true);
      setIsLoginPage(false);
    }

    setTimeout(() => {
      setIsLoaded(false);
    }, 600);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <TabProvider>
          <ThemeProvider>
            <Suspense fallback={<Loading />}>
              <Layout isLoaded={isLoaded} isLoginPage={isLoginPage} isLogin={isLogin}>
                {children}
              </Layout>
            </Suspense>
            {/* {!isLoginPage && isLogin ? (
              <Suspense fallback={<Loader />}>
                <Layout isLoaded={isLoaded}>{children}</Layout>
              </Suspense>
            ) : (
              children
            )} */}
          </ThemeProvider>
        </TabProvider>
      </body>
    </html>
  );
}
