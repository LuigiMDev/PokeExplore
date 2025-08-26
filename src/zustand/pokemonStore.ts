import { PokemonResponse } from "@/types/pokemon";
import { create } from "zustand";

type PokemonStore = {
  pokemons: PokemonResponse;
  setPokemons: (pokemons: PokemonResponse) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const pokemonStore = create<PokemonStore>((set) => ({
  pokemons: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  setPokemons: (pokemons) => set({ pokemons }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
