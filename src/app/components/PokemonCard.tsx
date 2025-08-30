/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pokemon } from "@/types/pokemon";
import React from "react";
import PokemonTypes from "./PokemonTypes";
import { pokemonTypes } from "@/app/utils/Pokemons";
import Link from "next/link";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const hp = pokemon.stats[0].base_stat;
  const attack = pokemon.stats[1].base_stat;
  const defense = pokemon.stats[2].base_stat;

  const getPokemonImage = (pokemon: Pokemon) => {
    return (
      pokemon.sprites.front_default ||
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.other?.home?.front_default
    );
  };

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card
        className={`text-white relative bg-slate-900 hover:scale-[1.02] transition-all border-slate-800/50 border-2 group cursor-pointer duration-300 hover:shadow-2xl`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br opacity-10 rounded-lg ${
            pokemonTypes[
              pokemon.types[0].type.name as keyof typeof pokemonTypes
            ].color || pokemonTypes.normal.color
          } `}
        ></div>
        <CardContent className="relative capitalize">
          <Badge variant={"cards"} className="bg-transparent text-white/70">
            #{pokemon.id}
          </Badge>
          <div className="flex flex-col items-center text-center transition-all space-y-4">
            <div className="rounded-full bg-gradient-to-br from-slate-800/50 via-slate-700/50 to-slate-800/50 shadow-lg ">
              <img
                src={getPokemonImage(pokemon)}
                alt={pokemon.name}
                className="group-hover:scale-110 transition-all w-32 h-32"
              />
            </div>
            <h3 className="group-hover:text-blue-400 text-xl font-bold text-white  transition-colors">
              {pokemon.name}
            </h3>
            <PokemonTypes pokemon={pokemon} />

            {/* Stats */}
            <div className="flex gap-4 mt-2 text-sm">
              <Badge className="bg-red-500/30 text-red-500">HP: {hp}</Badge>
              <Badge className="bg-yellow-500/30 text-yellow-500">
                ATK: {attack}
              </Badge>
              <Badge className="bg-blue-500/30 text-blue-500">
                DEF: {defense}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonCard;
