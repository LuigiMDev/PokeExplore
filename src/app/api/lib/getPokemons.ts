import { Pokemon } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";

const POKEMON_API = process.env.API_URL;

export const getPokemons = async (limit: number = 30, offset: number = 0) => {
  const listRes = await fetch(
    `${POKEMON_API}/pokemon/?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!listRes.ok) {
    throw new AppError(`${listRes.statusText}`, listRes.status);
  }

  const listData = await listRes.json();

  const detailedPokemons = await Promise.all(
    listData.results.map(async (p: { name: string; url: string }) => {
      const res = await fetch(p.url);
      const data: Pokemon = await res.json();

      return {
        id: data.id,
        name: data.name,
        stats: data.stats,
        sprites: {
          front_default: data.sprites.front_default,
        },
        types: data.types,
      };
    })
  );

  return {
    count: listData.count,
    results: detailedPokemons,
  };
};
