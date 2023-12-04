"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<any>({});

  const handleChange = (e: any) => {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();

      console.log(123123, form);

      const loginJson = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: form.id,
          pw: form.pw,
        }),
      });

      const login = await loginJson.json();

      console.log("handleLogin: ", login);
      if (login.result.status === "success") {
        sessionStorage.setItem("isLogin", "true");
        router.push("/front/");
      } else {
        alert("권한이 없거나 ID나 비밀번호가 틀립니다. 관리자에게 문의하세요");
        sessionStorage.setItem("isLogin", "false");
      }
    } catch (err) {
      console.error(err);

      // TODO: remove this after testing
      console.log("handleLogin TEST: ");
      sessionStorage.setItem("isLogin", "true");
      router.push("/");
    }
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <style>
        {`
              .login-page-component-class {
                border-width: 1px;
                border-style: solid;
                border-color: #757575;
                border-radius: 2px;
              }
              .login-page-input-button-class {
                appearance: auto;
                user-select: none;
                align-items: flex-start;
                text-align: center;
                cursor: default;
                box-sizing: border-box;
                background-color: #EFEFEF;
                color: black;
                white-space: pre;
                padding-block: 1px;
                padding-inline: 6px;
                border-width: 1px;
                border-style: solid;
                border-color: #505050;
                border-image: initial;
            `}
      </style>
      <form>
        <div className="flex h-[381px] w-[400px] flex-col border-[3px] border-double border-[#5076c9]">
          <div
            className="flex items-center justify-center bg-[#5076c9] p-1 text-[11px] font-bold text-white"
            style={{ fontFamily: "tahoma" }}>
            Authorization
          </div>
          <div className="h-[190px] w-full p-5"></div>
          <div className="flex h-[128px] w-full flex-col p-1">
            <div className="my-[0.5em] h-[1px] w-full bg-[#5076c9]"></div>
            <div className="flex w-full flex-row">
              <div
                className="flex w-[104px] items-center justify-end p-[2px] text-[11px] font-normal"
                style={{ fontFamily: "tahoma" }}>
                User Name:
              </div>
              <div className="h-[22px] w-[19px]"></div>
              <div className="p-[2px]">
                <input
                  className="login-page-component-class h-[19px] px-[2px] py-[1px] text-[11px] font-normal"
                  name="id"
                  type="text"
                  style={{ width: "200px" }}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex w-full flex-row">
              <div
                className="flex w-[104px] items-center justify-end p-[2px] text-[11px] font-normal"
                style={{ fontFamily: "tahoma" }}>
                Password:
              </div>
              <div className="h-[22px] w-[19px]"></div>
              <div className="p-[2px]">
                <input
                  className="login-page-component-class h-[19px] px-[2px] py-[1px] text-[11px] font-normal"
                  name="pw"
                  type="password"
                  style={{ width: "200px" }}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex w-full flex-row">
              <div
                className="flex w-[104px] items-center justify-end p-[2px] text-[11px] font-normal"
                style={{ fontFamily: "tahoma" }}>
                Locale:
              </div>
              <div className="h-[21px] w-[19px]"></div>
              <div className="flex items-center justify-center p-[2px]">
                <select
                  className="login-page-component-class text-[11px] text-[#666]"
                  name="localeCode"
                  style={{ fontFamily: "돋움" }}>
                  <option value="KR">KR</option>
                  <option value="EN">EN</option>
                </select>
              </div>
            </div>
            <div className="flex w-full flex-row">
              <div
                className="flex w-[104px] items-center justify-end p-[2px] text-[11px] font-normal"
                style={{ fontFamily: "tahoma" }}>
                Mode
              </div>
              <div className="h-[21px] w-[19px]"></div>
              <div className="flex items-center justify-center p-[2px]">
                <select
                  className="login-page-component-class text-[11px] text-[#666]"
                  name="mode"
                  style={{ fontFamily: "돋움" }}>
                  <option value="html">Html</option>
                  <option value="flex">Flex</option>
                </select>
              </div>
            </div>
            <div className="flex w-full flex-row justify-end gap-[2px]">
              <input
                type="button"
                className="login-page-input-button-class h-[19px] w-[120px] rounded-[2px] text-[11px] font-normal hover:bg-[#e4e4e4]"
                style={{ fontFamily: "tahoma" }}
                value="Password Change"
              />
              <input
                type="button"
                className="login-page-input-button-class h-[19px] w-[80px] rounded-[2px] text-[11px] font-normal hover:bg-[#e4e4e4]"
                style={{ fontFamily: "tahoma" }}
                value="Login"
                onClick={handleLogin}
              />
              <input
                type="reset"
                className="login-page-input-button-class h-[19px] w-[80px] rounded-[2px] text-[11px] font-normal hover:bg-[#e4e4e4]"
                style={{ fontFamily: "tahoma" }}
                value="Reset"
              />
            </div>
          </div>
          <div className="border-t border-[#5076c9] p-1">
            <img src="/images/logo.gif" />
          </div>
        </div>
        <div className="my-[14px] flex w-full justify-center">
          <h2 className="font-bold">
            <a className="cursor-pointer underline visited:text-[#666666]">다운로드 페이지 이동</a>
          </h2>
        </div>
      </form>
    </div>
  );
}
