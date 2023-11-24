"use client";

import { useTab } from "@/providers/TabProvider";

export default function Page() {
  const { selectedTab } = useTab();

  return <div>{selectedTab?.text}</div>;
}
