import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className=" flex items-center justify-between">
      <Link href={"/"} className=" flex items-center gap-1">
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png"
          }
          alt="Logo"
          width={50}
          height={50}
          className=""
        />
        <h1 className=" font-bold text-xl">Dropbox</h1>
      </Link>
      <div className=" flex space-x-2 items-center px-5">
        {/* Toggle theme button */}
        <ThemeToggle />

        {/* user sign in out button from clerk */}

        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
