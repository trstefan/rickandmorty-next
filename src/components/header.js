import Link from "next/link";

export const Header = () => {
  return (
    <div className="grid place-self-center p-2">
      <Link href="/">
        <img src="/logo.jpg" alt="logo" />
      </Link>
    </div>
  );
};
