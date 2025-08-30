import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DetailedPokemon } from "@/types/pokemon";
import PokemonImageGallery from "./PokemonImageGallery";
import PokemonBasicInfo from "./PokemonBasicInfo";
import PokemonStatsDetailed from "./PokemonStatsDetailed";
import PokemonAbilities from "./PokemonAbilities";
import BackButton from "./BackButton";
import Header from "./Header";

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let pokemon: undefined | DetailedPokemon = undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pokemons/${id}`
  );

  if (res.ok) pokemon = (await res.json()).results[0];

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full">
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

          <div className="mt-8">
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
