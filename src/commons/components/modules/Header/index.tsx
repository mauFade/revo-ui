import Link from "next/link";
import React, { FC, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

const Header: FC = () => {
  return (
    <header className="container bg-themeGrey p-4 h-14 w-full flex justify-between items-center fixed border border-red-500 mb-5">
      <nav className="space-x-4 flex items-center">
        <Link
          href="/feed"
          className="hover:text-themeUnactiveRed transition-colors flex flex-col items-center"
        >
          <IoHomeOutline size={28} />
          Página Inicial
        </Link>
        <Link
          href="/whats-happening"
          className="hover:text-themeUnactiveRed transition-colors flex flex-col items-center"
        >
          <TbWorld size={28} />
          Descubra
        </Link>
        <Link
          href="https://www.linkedin.com/in/maucardooso/"
          target="_blank"
          className="hover:text-themeUnactiveRed transition-colors flex flex-col items-center"
        >
          <IoIosInformationCircleOutline size={28} />
          Sobre Nós
        </Link>
        <button className="hover:text-themeUnactiveRed focus:outline-none">
          <CgProfile size={28} />
          <span
            className="flex items-center
            "
          >
            Eu <IoMdArrowDropdown />
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
