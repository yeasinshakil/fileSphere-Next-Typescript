import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="py-1 dark:bg-slate-900">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png"
            }
            alt="Logo"
            width={50}
            height={50}
          />
          <h1 className=" font-bold text-xl">FileSphere</h1>
        </Link>
        <div className=" flex space-x-2 items-center">
          {/* Toggle theme button */}
          <ThemeToggle />

          {/* user sign in out button from clerk */}

          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
