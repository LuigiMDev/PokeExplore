import { AppError } from "@/utils/AppError";
import { NextRequest, NextResponse } from "next/server";
import { getPokemonOfTheDay } from "../helpers/getPokemonOfTheDay";

function isPokemonCorrect(userInput: string, pokemonName: string) {
  const normalizedInput = userInput.toLowerCase().replace(/[^a-z0-9]/g, "");

  const normalizedName = pokemonName.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    normalizedInput.includes(normalizedName) ||
    normalizedName.includes(normalizedInput)
  );
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) throw new AppError("Pergunta não fornecida", 400);

    const pokemonOfTheDay = await getPokemonOfTheDay();

    if (isPokemonCorrect(question, pokemonOfTheDay.name)) {
      return NextResponse.json({
        isPokemonCorrect: true,
        pokemonOfTheDay,
        message: `🎉 Parabéns! Você acertou, o Pokémon do dia é ${
          pokemonOfTheDay.name.charAt(0).toUpperCase() +
          pokemonOfTheDay.name.slice(1)
        }`,
      });
    }

    const context = `Você é um assistente que joga 'Quem é esse Pokémon' com o usuário. Regras:
1. Não diga o nome do Pokémon até que o usuário acerte.
2. Responda apenas com dicas relacionadas ao Pokémon do dia.
3. Sempre forneça dicas curtas e diretas.
4. O Pokémon muda a cada dia, e você só deve falar sobre o Pokémon do dia atual.

Pokemon do dia atual: ${JSON.stringify(pokemonOfTheDay)}`;

    const data = {
      model: "meta-llama/Meta-Llama-3-8B-Instruct:novita",
      messages: [
        { role: "system", content: context },
        { role: "user", content: question },
      ],
    };

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return NextResponse.json({
      isPokemonCorrect: false,
      pokemonOfTheDay,
      message: result.choices[0].message.content,
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
      { error: "Falha ao processar a requisição" },
      { status: 500 }
    );
  }
}
