import { AppError } from "@/utils/AppError";
import { NextResponse } from "next/server";
import { getPokemonOfTheDay } from "../../helpers/getPokemonOfTheDay";

export async function GET() {
  try {
    return NextResponse.json(await getPokemonOfTheDay());
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json({ err: err.message }, { status: err.status });
    }
    console.error(err);
    return NextResponse.json(
      { err: "Falha ao processar a requisição" },
      { status: 500 }
    );
  }
}
