export type NamedAPIResource = {
  name: string;
  url: string;
};

// Imagens
export type PokemonSprites = {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: {
    dream_world?: {
      front_default?: string;
      front_female?: string;
    };
    home?: {
      front_default?: string;
      front_female?: string;
      front_shiny?: string;
      front_shiny_female?: string;
    };
    ["official-artwork"]?: {
      front_default?: string;
      front_shiny?: string;
    };
    showdown?: {
      front_default?: string;
      back_default?: string;
      front_shiny?: string;
      back_shiny?: string;
      front_female?: string;
      back_female?: string;
      front_shiny_female?: string;
      back_shiny_female?: string;
    };
  };
};

// Sons
export type PokemonCries = {
  latest: string | null;
  legacy: string | null;
};

// Habilidades
export type PokemonAbility = {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

// Atributos
export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

// Tipos
export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

// Formas
export type PokemonForm = NamedAPIResource;

// Movimentos
export type PokemonMove = {
  move: NamedAPIResource;
};

// Item evolutivo
export type PokemonHeldItem = {
  item: NamedAPIResource;
};

// Estrutura principal do Pokémon
export type Pokemon = {
  id: number;
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};

export type PokemonListAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type PokemonResponse = {
  count: number;
  results: Pokemon[];
};

export type DetailedPokemon = {
  id: number;
  name: string;
  order: number;
  base_experience: number;
  height: number; // altura (em decímetros)
  weight: number; // peso (em hectogramas)
  sprites: PokemonSprites;
  cries?: PokemonCries;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  held_items: PokemonHeldItem[];
  forms: PokemonForm[];
};

export type DetailedPokemonResponse = {
  count: number;
  results: DetailedPokemon;
};
