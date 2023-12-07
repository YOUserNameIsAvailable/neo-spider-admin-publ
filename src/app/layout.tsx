"use client";

import { Inter } from "next/font/google";
import "./globals.scss";
import React, { useEffect, useState, ReactNode, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TabProvider } from "@/providers/TabProvider";
import { Layout } from "@/components/shared/layout";
import ThemeProvider from "@/providers/ThemeProvider";
import Loading from "../components/loading";
import { is } from "immutable";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
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

    console.log("Rootlayout: ", !isLoginPage && isLogin, isLoaded, isLoginPage, isLogin, isHomePage);

    setTimeout(() => {
      setIsLoaded(false);
    }, 600);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <TabProvider>
          <ThemeProvider>
            {/* <Suspense fallback={<Loading />}>
              <Layout isLoaded={isLoaded} isLoginPage={isLoginPage} isLogin={isLogin}>
                {children}
              </Layout>
            </Suspense> */}
            {!isLoginPage && isLogin ? (
              <Suspense fallback={<Loading />}>
                <Layout>{children}</Layout>
              </Suspense>
            ) : !isLoaded ? (
              children
            ) : (
              <Loading />
            )}
          </ThemeProvider>
        </TabProvider>
      </body>
    </html>
  );
}
