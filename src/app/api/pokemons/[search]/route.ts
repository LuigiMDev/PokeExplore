import { AppError } from "@/utils/AppError";
import { NextRequest, NextResponse } from "next/server";

const POKEMON_API = process.env.API_URL;

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

    return NextResponse.json({ count: 1, results: [listData] });
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
