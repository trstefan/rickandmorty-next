import { Header } from "@/components/header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-center ">
      <Header />
      <main>{children}</main>
    </div>
  );
}
