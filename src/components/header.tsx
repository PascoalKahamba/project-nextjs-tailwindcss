import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <header className="w-full h-[70px] text-white bg-slate-900 dark:bg-slate-600 p-1 fixed z-[1000] flex justify-between">
      <Image
        priority
        src="/logotipo.avif"
        width={100}
        height={100}
        alt="picture from the project"
        className="block"
      />
      <Link href="./components/login" target="_blank" className="block">
        my profile
      </Link>
      {currentTheme === "dark" ? (
        <Image
          src="/moon.svg"
          width={50}
          height={50}
          alt="here look the photo theme"
          onClick={() => setTheme("light")}
          className="block cursor-pointer"
        />
      ) : (
        <Image
          src="/sun.svg"
          width={50}
          height={50}
          onClick={() => setTheme("dark")}
          alt="here look the photo theme"
          className="block cursor-pointer"
        />
      )}
    </header>
  );
};

export default Header;
