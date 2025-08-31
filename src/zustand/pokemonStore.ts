import { PokemonResponse } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";
import { create } from "zustand";

type PokemonStore = {
  pokemons: PokemonResponse;
  setPokemons: (pokemons: PokemonResponse) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedType: string;
  setSelectedType: (selectedType: string) => void;
  searchByInput: () => Promise<void>;
  searchByType: () => Promise<void>;
  isLoading: boolean;
};

export const pokemonStore = create<PokemonStore>((set, get) => ({
  pokemons: {
    count: 0,
    results: [],
  },
  setPokemons: (pokemons) => set({ pokemons }),
  searchInput: "",
  setSearchInput: (searchInput) => set({ searchInput }),
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  selectedType: "",
  setSelectedType: (selectedType) => set({ selectedType }),
  searchByInput: async () => {
    set({ isLoading: true });
    const { searchInput } = get();
    const res = await fetch(`/api/pokemons/${searchInput && searchInput}`);
    if (!res.ok) {
      throw new AppError("Ocorreu um erro ao buscar os pokémons!");
    }
    const pokemonsData: PokemonResponse = await res.json();
    set({ pokemons: pokemonsData, isLoading: false });
  },
  searchByType: async () => {
    set({ isLoading: true });
    const { selectedType, currentPage } = get();
    const res = await fetch(
      `${
        selectedType
          ? `/api/pokemons/type/${selectedType}?page=${currentPage}`
          : `/api/pokemons?page=${currentPage}`
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
