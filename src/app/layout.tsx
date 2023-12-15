"use client";

import { Inter } from "next/font/google";
import "./globals.scss";
import "@progress/kendo-theme-default/dist/all.css";
import React, { useEffect, useState, ReactNode, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TabProvider } from "@/providers/TabProvider";
import { Layout } from "@/components/shared/layout";
import ThemeProvider from "@/providers/ThemeProvider";
import Loading from "../components/loading";
import DialogModalContextProvider from "@/hooks/ModalDialogContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  // const [isLoginPage, setIsLoginPage] = useState(false);

  const isHomePage = pathname.indexOf("front") > -1;
  const isLoginPage = pathname.indexOf("login") > -1;

  console.log(123123, pathname, isHomePage, isLoginPage);

  useEffect(() => {
    const sessionIsLogin = sessionStorage.getItem("isLogin") || {};
    const _isLogin = Object.keys(sessionIsLogin).length > 0 ? true : false;
    setIsLogin(_isLogin);

    console.log(
      999,
      pathname,
      _isLogin,
      isLoginPage,
      !isLoaded && !isLoginPage && _isLogin,
      Object.keys(sessionIsLogin).length,
    );

    if (!_isLogin && !isLoginPage) {
      console.log(111, "login");
      alert("로그인이 필요합니다.");
      router.push("/login");
    } else if (_isLogin && isLoginPage) {
      console.log(222, "front");
      alert("이미 로그인 되어있습니다.");
      router.push("/user-management");
    }

    console.log("Rootlayout: ", !isLoginPage && _isLogin, isLoaded, isLoginPage, _isLogin, isHomePage, isLogin);

    // setTimeout(() => {
    //   setIsLoaded(true);
    // }, 600);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <TabProvider>
          <ThemeProvider>
            <DialogModalContextProvider>
              {/*{isLogin && !isLoginPage ? <Layout>{children}</Layout> : !isLoaded ? children : <Loading />}*/}
              <Suspense fallback={<Loading />}>
                <Layout>{children}</Layout>
              </Suspense>
            </DialogModalContextProvider>
          </ThemeProvider>
        </TabProvider>
      </body>
    </html>
  );
}
