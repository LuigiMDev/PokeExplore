import { Pokemon } from "@/types/pokemon";
import { NextResponse } from "next/server";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") || 30);
  const offset = Number(searchParams.get("offset") || 30);

  try {
    const listRes = await fetch(
      `${POKEMON_API}?limit=${limit}&offset=${offset}`
    );
    const listData = await listRes.json();

    const detailedPokemons = await Promise.all(
      listData.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url);
        const data: Pokemon = await res.json();

        return {
          id: data.id,
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
          },
          types: data.types.map((t) => t.type.name),
        };
      })
    );

    return NextResponse.json({
      count: listData.count,
      next: listData.next,
      previous: listData.previous,
      results: detailedPokemons,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failha ao buscar os pokemons" },
      { status: 500 }
    );
  }
}
