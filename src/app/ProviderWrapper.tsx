"use client";
import { SessionProvider } from "next-auth/react";
//Don't mess with.
export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
