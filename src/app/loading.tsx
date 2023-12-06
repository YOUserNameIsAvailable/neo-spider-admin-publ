"use client";

import { Loader } from "@progress/kendo-react-indicators";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75" style={{ zIndex: 101 }}>
      <Loader type="infinite-spinner" />
    </div>
  );
}
