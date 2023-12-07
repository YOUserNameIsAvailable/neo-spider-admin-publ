"use client";

import { Loader } from "@progress/kendo-react-indicators";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <Loader type="infinite-spinner" />
    </div>
  );
}
