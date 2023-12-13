"use client";
import "../globals.scss";
import React from "react";

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">{children}</div>;
}
