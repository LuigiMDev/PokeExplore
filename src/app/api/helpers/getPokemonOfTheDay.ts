import { DetailedPokemon, PokemonResponse } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";

const POKEMON_API = process.env.API_URL;

export async function getPokemonOfTheDay() {
  const listRes = await fetch(`${POKEMON_API}/pokemon/?limit=1`);
  if (!listRes.ok) throw new AppError(listRes.statusText, listRes.status);
  const listData: PokemonResponse = await listRes.json();

  const pokemonIndex = Math.floor(
    (Date.now() / (1000 * 60 * 60 * 24)) % listData.count
  );

  const resPokemonOfTheDay = await fetch(
    `${POKEMON_API}/pokemon/${pokemonIndex}`
  );
  if (!resPokemonOfTheDay.ok)
    throw new AppError(
      resPokemonOfTheDay.statusText,
      resPokemonOfTheDay.status
    );
  const pokemonOfTheDay: DetailedPokemon = await resPokemonOfTheDay.json();
  return {
    id: pokemonOfTheDay.id,
    name: pokemonOfTheDay.name,
    sprites: pokemonOfTheDay.sprites,
    types: pokemonOfTheDay.types.map((t) => t.type.name),
    stats: pokemonOfTheDay.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    height: pokemonOfTheDay.height,
    weight: pokemonOfTheDay.weight,
  };
}
