import { ReactNode } from "react";
import Navbar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  );
}
