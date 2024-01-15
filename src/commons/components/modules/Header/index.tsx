import Link from "next/link";
import React, { FC, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

const UserCard: FC = () => {
  // Dados fictícios do usuário (substitua por dados reais do usuário)
  const userData = {
    nome: "Mauricio Cardoso",
    username: "mau",
    bio: "Rato de academia",
    city: "Curitiba",
    country: "Brasil",
  };

  return (
    <div className="absolute mt-8 top-16 right-4 bg-themeBlack p-4 rounded-md shadow-md border border-themeMetal">
      <div>
        <h1>{userData.nome}</h1>
        <p>{userData.username}</p>
        <p>{userData.bio}</p>
        <p>
          {userData.city}, {userData.country}
        </p>
      </div>
    </div>
  );
};

const Header: FC = () => {
  const [isUserCardVisible, setIsUserCardVisible] = useState<boolean>(false);

  const handleUserCardToggle = () => {
    setIsUserCardVisible(!isUserCardVisible);
  };

  return (
    <header className="bg-themeBlack text-themeMetal p-4 border-b border-themeMetal ">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Revo</h1>
        </div>
        <nav className="space-x-4 flex items-center">
          <Link
            href="/feed"
            className="hover:text-white transition-colors flex flex-col items-center"
          >
            <IoHomeOutline size={28} />
            Página Inicial
          </Link>
          <Link
            href="/whats-happening"
            className="hover:text-white transition-colors flex flex-col items-center"
          >
            <TbWorld size={28} />
            Descubra
          </Link>
          <Link
            href="https://www.linkedin.com/in/maucardooso/"
            target="_blank"
            className="hover:text-white transition-colors flex flex-col items-center"
          >
            <IoIosInformationCircleOutline size={28} />
            Sobre Nós
          </Link>
          <button
            className="hover:text-white focus:outline-none"
            onClick={handleUserCardToggle}
          >
            <CgProfile size={28} />
            <span
              className="flex items-center
            "
            >
              Eu <IoMdArrowDropdown />
            </span>
          </button>
        </nav>
      </div>

      {isUserCardVisible && <UserCard />}
    </header>
  );
};

export default Header;
