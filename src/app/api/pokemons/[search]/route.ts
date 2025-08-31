import { AppError } from "@/utils/AppError";
import { NextRequest, NextResponse } from "next/server";
import { getPokemonByIdOrSearch } from "../../lib/getPokemonByIdOrSearch";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ search: string }> }
) {
  const { search } = await params;

  if (!search) {
    return NextResponse.json(
      { error: "O parâmetro search é obrigatório" },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json(await getPokemonByIdOrSearch(search));
  } catch (error) {
    if (error instanceof AppError) {
      if (error.status === 404) {
        return NextResponse.json({ count: 0, results: [] });
      }
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
