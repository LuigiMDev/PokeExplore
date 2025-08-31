import { AppError } from "@/utils/AppError";
import { NextResponse } from "next/server";
import { getPokemons } from "../lib/getPokemons";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = 30;
  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * limit;

  try {
    return NextResponse.json(await getPokemons(limit, offset));
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
