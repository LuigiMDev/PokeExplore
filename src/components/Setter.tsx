"use client";
import { PokemonResponse } from "@/types/pokemon";
import { pokemonStore } from "@/zustand/pokemonStore";
import React, { useEffect } from "react";

const Setter = ({
  children,
  initialPokemonsData,
}: {
  children: React.ReactNode;
  initialPokemonsData: PokemonResponse;
}) => {
  const setPokemons = pokemonStore((state) => state.setPokemons);
  useEffect(() => {
    setPokemons(initialPokemonsData);
  }, [setPokemons, initialPokemonsData]);
  return <>{children}</>;
};

export default Setter;
