import { PokemonResponse } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";
import { create } from "zustand";

type PokemonStore = {
  pokemons: PokemonResponse;
  setPokemons: (pokemons: PokemonResponse) => void;
  searchByInput: (search: string) => Promise<void>;
  searchByType: (pokemonType: string, page: number) => Promise<void>;
  isLoading: boolean;
};

export const pokemonStore = create<PokemonStore>((set) => ({
  pokemons: {
    count: 0,
    results: [],
  },
  setPokemons: (pokemons) => set({ pokemons }),
  searchByInput: async (search) => {
    set({ isLoading: true });
    const res = await fetch(`/api/pokemons/${search && search}`);
    if (!res.ok) {
      throw new AppError("Ocorreu um erro ao buscar os pokémons!");
    }
    const pokemonsData: PokemonResponse = await res.json();
    set({ pokemons: pokemonsData, isLoading: false });
  },
  searchByType: async (pokemonType, page) => {
    set({ isLoading: true });
    const res = await fetch(
      `${
        pokemonType
          ? `/api/pokemons/type/${pokemonType}?page=${page}`
          : `/api/pokemons?page=${page}`
      }`
    );
    if (!res.ok) {
      throw new AppError("Ocorreu um erro ao buscar os pokémons!");
    }
    const pokemonsData: PokemonResponse = await res.json();
    set({ pokemons: pokemonsData, isLoading: false });
  },
  isLoading: false,
}));
