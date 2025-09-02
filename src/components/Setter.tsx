"use client";
import { PokemonResponse } from "@/types/pokemon";
import { pokemonStore } from "@/zustand/pokemonStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Gamepad, LucideHome } from "lucide-react";

const Setter = ({
  children,
  initialPokemonsData,
}: {
  children: React.ReactNode;
  initialPokemonsData: PokemonResponse;
}) => {
  const setPokemons = pokemonStore((state) => state.setPokemons);
  const [headerTransparent, setHeaderTransparent] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setPokemons(initialPokemonsData);
  }, [setPokemons, initialPokemonsData]);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setHeaderTransparent(window.scrollY < 10);
      } else {
        // em outras páginas, nunca transparente
        setHeaderTransparent(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // garante estado correto no mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  return (
    <>
      {pathname && (
        <header
          className={` top-0 z-50 inset-x-0 p-4 h-20 flex items-center ${
            pathname === "/" ? "fixed " : "sticky"
          }`}
        >
          <div
            className={`absolute border-b border-slate-700/50 bg-slate-900 shadow-xl inset-0 duration-300 ${
              pathname === "/"
                ? headerTransparent
                  ? "opacity-0 transition-all"
                  : "opacity-100 transition-all"
                : "transition-none"
            }`}
          ></div>
          <div className=" px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between relative w-full">
              <Link href={"/"}>
                <Image
                  src={"/logo.png"}
                  alt="PokeExplore"
                  width={80}
                  height={80}
                />
              </Link>
              <div className="flex gap-3">
                <Button
                  variant={pathname === "/" ? "default" : "secondary"}
                  asChild
                >
                  <Link href={"/"}>
                    <LucideHome />{" "}
                    <span className="hidden md:block">Explorar</span>
                  </Link>
                </Button>
                <Button
                  variant={pathname === "/game" ? "default" : "secondary"}
                  asChild
                >
                  <Link href={"/game"}>
                    <Gamepad /> <span className="hidden md:block">Jogo IA</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}
      {children}
    </>
  );
};

export default Setter;
