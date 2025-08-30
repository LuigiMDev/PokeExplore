import { Pokemon } from "@/types/pokemon";
import { AppError } from "@/utils/AppError";
import { NextRequest, NextResponse } from "next/server";

const POKEMON_API = process.env.API_URL;

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
  const limit = 30;
  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * limit;
  try {
    const listRes = await fetch(`${POKEMON_API}/type/${type}`);
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
              stats: data.stats,
              sprites: {
                front_default: data.sprites.front_default,
              },
              types: data.types,
            };
          }
        )
    );

    return NextResponse.json({
      count: listData.pokemon.length,
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
