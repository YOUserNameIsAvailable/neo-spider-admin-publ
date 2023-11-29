"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { PAGES, SPORTS } from "@/constants";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
  locale: yup.string().required("Locale is required"),
  mode: yup.string().required("Mode is required"),
});

export default function Page() {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-[auto] w-[550px] justify-center border align-middle">
        <div className="h-45 w-full justify-center border-2 border-blue-500">
          <h2 className="border-b-2 border-blue-500 py-2 text-center font-semibold text-black">Authorization</h2>
          <div className="h-[200px] w-[550px] border-b-2 border-blue-500"></div>
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <span className="pb-4 pt-6 text-[14px] text-black">User Name :</span>
              <Controller
                name="userName"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Input {...field} className="h-7 w-52" />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <span className="py-4 text-[14px] text-black">Password :</span>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Input {...field} type="password" className="h-7 w-52" />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="flex items-center gap-2">
              <span className="py-4 text-[14px] text-black">Locale:</span>
              <Controller
                name="locale"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <DropDownList
                      {...field}
                      className="w-25 h-7"
                      size={"small"}
                      data={SPORTS}
                      defaultValue="Option 1"
                      filterable={false}
                    />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="flex items-center gap-2">
              <span className="py-4 text-[14px] text-black">Mode:</span>
              <Controller
                name="mode"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <DropDownList
                      {...field}
                      className="w-25 h-7"
                      size={"small"}
                      data={SPORTS}
                      defaultValue="Option 1"
                      filterable={false}
                    />
                    {fieldState.error && <p className="text-red-500">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 px-3">
            <Button type="submit" className="mt-2 flex items-center justify-end">
              Password Change
            </Button>
            <Button type="submit" className="mt-2 flex items-center justify-end">
              Login
            </Button>
            <Button type="submit" className="mt-2 flex items-center justify-end">
              Reset
            </Button>
          </div>
          <div className="mt-2 w-full justify-center border-2 border-blue-500 p-2">
            <img src="http://tst.neobns.com:9480/images/login/logo.gif" alt="Logo" />
          </div>
        </div>
      </div>
    </form>
  );
}
