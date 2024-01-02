import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import type { Metadata } from "next";
import ProviderWrapper from "./ProviderWrapper";
import ReduxProvider from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "HoundScout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ProviderWrapper>{children}</ProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
