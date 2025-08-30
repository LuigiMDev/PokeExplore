import { Pokemon } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";
import { NextResponse } from "next/server";

const POKEMON_API = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 30);
  const offset = Number(searchParams.get("offset") || 30);

  try {
    const listRes = await fetch(
      `${POKEMON_API}/pokemon/?limit=${limit}&offset=${offset}`
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

    return NextResponse.json({
      count: listData.count,
      results: detailedPokemons,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao buscar os pokemons" },
      { status: 500 }
    );
  }
}
