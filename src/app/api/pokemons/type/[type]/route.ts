import { Pokemon } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";
import { NextRequest, NextResponse } from "next/server";

const POKEMON_API = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { type: string };
  }
) {
  const { type } = await params;
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 30);
  const offset = Number(searchParams.get("offset") || 30);
  try {
    const listRes = await fetch(
      `${POKEMON_API}/type/${type}?limit=${limit}&offset=${offset}`
    );
    const listData = await listRes.json();

    if (!listRes.ok) {
      throw new AppError(`${listRes.statusText}`, listRes.status);
    }

    const detailedPokemons = await Promise.all(
      listData.pokemon
        .slice(offset, offset + limit)
        .map(
          async ({ pokemon }: { pokemon: { name: string; url: string } }) => {
            const res = await fetch(pokemon.url);
            const data: Pokemon = await res.json();

            return {
              id: data.id,
              name: data.name,
              sprites: {
                front_default: data.sprites.front_default,
              },
              types: data.types,
            };
          }
        )
    );

    return NextResponse.json({
      count: detailedPokemons.length - 1,
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
