import { AppError } from "@/utils/AppError";

const POKEMON_API = process.env.API_URL;

export const getPokemonByIdOrSearch = async (search: string) => {
  const listRes = await fetch(
    `${POKEMON_API}/pokemon/${search?.toLowerCase()}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!listRes.ok) {
    throw new AppError(`${listRes.statusText}`, listRes.status);
  }

  const listData = await listRes.json();

  return { count: 1, results: [listData] };
};
