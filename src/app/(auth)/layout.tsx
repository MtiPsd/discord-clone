import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center">{children}</div>
  );
}

export default AuthLayout;
