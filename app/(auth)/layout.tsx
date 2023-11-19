import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="h-full bg-red-500">{children}</div>;
}

export default AuthLayout;
