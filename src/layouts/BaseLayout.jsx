import React from "react";
import { Analytics } from "@vercel/analytics/react";

export default function BaseLayout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
