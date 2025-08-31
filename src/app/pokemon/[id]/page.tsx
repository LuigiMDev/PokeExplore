import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DetailedPokemon } from "@/types/pokemon";
import PokemonImageGallery from "./components/PokemonImageGallery";
import PokemonBasicInfo from "./components/PokemonBasicInfo";
import PokemonStatsDetailed from "./components/PokemonStatsDetailed";
import PokemonAbilities from "./components/PokemonAbilities";
import BackButton from "./components/BackButton";
import Header from "./components/Header";
import { getPokemonByIdOrSearch } from "@/app/api/lib/getPokemonByIdOrSearch";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const pokemon: DetailedPokemon | undefined = (
      await getPokemonByIdOrSearch(id)
    ).results[0];

    if (!pokemon) {
      return {
        title: "Pokémon não encontrado",
        description: "Esse Pokémon não existe no nosso banco de dados.",
      };
    }

    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`,
      description: `Explore detalhes do Pokémon ${pokemon.name}, incluindo estatísticas, habilidades e movimentos.`,
      openGraph: {
        title: `${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }`,
        description: `Explore detalhes do Pokémon ${pokemon.name}.`,
        images: [
          {
            url:
              pokemon.sprites?.other?.["official-artwork"]?.front_default ?? "",
            alt: pokemon.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }`,
        description: `Explore detalhes do Pokémon ${pokemon.name}.`,
        images: [
          pokemon.sprites?.other?.["official-artwork"]?.front_default ?? "",
        ],
      },
    };
  } catch {
    return {
      title: "Erro",
      description: "Ocorreu um erro ao carregar os dados do Pokémon.",
    };
  }
}

export default async function PokemonDetail({ params }: Props) {
  const { id } = await params;

  let pokemon: DetailedPokemon | undefined;

  try {
    pokemon = (await getPokemonByIdOrSearch(id)).results[0];
  } catch {
    pokemon = undefined;
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pokémon não encontrado
          </h2>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full relative">
      {/* Header */}
      <Header pokemon={pokemon} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 max-w-full">
          {/* Left - Image Gallery */}

          <PokemonImageGallery pokemon={pokemon} />

          {/* Right - Basic Info */}

          <PokemonBasicInfo pokemon={pokemon} />
        </div>

        {/* Detailed Information Tabs */}

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-transparent gap-2">
            <TabsTrigger className="bg-slate-800/50 " value="stats">
              Estatísticas
            </TabsTrigger>
            <TabsTrigger className="bg-slate-800/50 " value="abilities">
              Habilidades
            </TabsTrigger>
            <TabsTrigger className="bg-slate-800/50 " value="moves">
              Movimentos
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 relative">
            <TabsContent value="stats">
              <PokemonStatsDetailed stats={pokemon.stats} />
            </TabsContent>

            <TabsContent value="abilities">
              <PokemonAbilities abilities={pokemon.abilities} />
            </TabsContent>

            <TabsContent value="moves">
              <div className="glass-card glow-border rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Movimentos
                </h3>
                <div className="flex flex-wrap gap-3">
                  {pokemon.moves?.map((move, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-slate-800/50 text-slate-300 border-slate-600 p-3 justify-start"
                    >
                      {move.move.name.replace(/-/g, " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
