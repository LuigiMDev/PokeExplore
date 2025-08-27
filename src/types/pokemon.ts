export type NamedAPIResource = {
  name: string;
  url: string;
};

// Imagens
export type PokemonSprites = {
  back_default: string | undefined;
  back_female: string | undefined;
  back_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_default: string | undefined;
  front_female: string | undefined;
  front_shiny: string | undefined;
  front_shiny_female: string | undefined;
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
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};
