/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pokemon } from "@/types/pokemon";
import React from "react";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const typeColors = {
    normal: "from-slate-400 to-slate-500",
    fire: "from-red-500 to-orange-500",
    water: "from-blue-500 to-cyan-500",
    electric: "from-yellow-400 to-yellow-500",
    grass: "from-green-500 to-emerald-500",
    ice: "from-cyan-400 to-blue-400",
    fighting: "from-red-600 to-red-700",
    poison: "from-purple-500 to-violet-500",
    ground: "from-amber-600 to-yellow-600",
    flying: "from-blue-400 to-indigo-400",
    psychic: "from-pink-500 to-purple-500",
    bug: "from-lime-500 to-green-500",
    rock: "from-stone-500 to-stone-600",
    ghost: "from-indigo-600 to-purple-600",
    dragon: "from-indigo-500 to-purple-600",
    dark: "from-slate-700 to-slate-800",
    steel: "from-slate-500 to-gray-500",
    fairy: "from-pink-400 to-pink-500",
  };

  const typeStyles = {
    normal:
      "bg-slate-500/20 hover:bg-slate-500/10 text-slate-300 border-slate-500/30",
    fire: "bg-red-500/20 hover:bg-red-500/10 text-red-300 border-red-500/30",
    water:
      "bg-blue-500/20 hover:bg-blue-500/10 text-blue-300 border-blue-500/30",
    electric:
      "bg-yellow-500/20 hover:bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
    grass:
      "bg-green-500/20 hover:bg-green-500/10 text-green-300 border-green-500/30",
    ice: "bg-cyan-500/20 hover:bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    fighting:
      "bg-red-600/20 hover:bg-red-600/10 text-red-300 border-red-600/30",
    poison:
      "bg-purple-500/20 hover:bg-purple-500/10 text-purple-300 border-purple-500/30",
    ground:
      "bg-amber-600/20 hover:bg-amber-600/10 text-amber-300 border-amber-600/30",
    flying:
      "bg-indigo-500/20 hover:bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    psychic:
      "bg-pink-500/20 hover:bg-pink-500/10 text-pink-300 border-pink-500/30",
    bug: "bg-lime-500/20 hover:bg-lime-500/10 text-lime-300 border-lime-500/30",
    rock: "bg-stone-500/20 hover:bg-stone-500/10 text-stone-300 border-stone-500/30",
    ghost:
      "bg-indigo-600/20 hover:bg-indigo-600/10 text-indigo-300 border-indigo-600/30",
    dragon:
      "bg-purple-600/20 hover:bg-purple-600/10 text-purple-300 border-purple-600/30",
    dark: "bg-slate-700/20 hover:bg-slate-700/10 text-slate-300 border-slate-700/30",
    steel:
      "bg-slate-400/20 hover:bg-slate-400-10 text-slate-300 border-slate-400/30",
    fairy:
      "bg-pink-400/20 text-pink-300 border-pink-400/30 hover:bg-pink-400/10",
  };

  const typeIcons = {
    normal: "●",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌿",
    ice: "❄️",
    fighting: "👊",
    poison: "☠️",
    ground: "🌍",
    flying: "🦅",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐲",
    dark: "🌙",
    steel: "⚔️",
    fairy: "🧚",
  };

  return (
    <Card
      className={`text-white relative bg-slate-900 hover:scale-[1.02] transition-all border-slate-800/50 border-2 group cursor-pointer duration-300 hover:shadow-2xl`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-10 rounded-lg ${
          typeColors[pokemon.types[0].type.name as keyof typeof typeColors] ||
          typeColors.normal
        } `}
      ></div>
      <CardContent className="relative capitalize">
        <Badge variant={"cards"} className="bg-transparent text-white/70">
          {pokemon.id}
        </Badge>
        <div className="flex flex-col items-center text-center transition-all space-y-4">
          <div className="rounded-full bg-gradient-to-br from-slate-800/50 via-slate-700/50 to-slate-800/50 shadow-lg ">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="group-hover:scale-110 transition-all w-32 h-32"
            />
          </div>
          <h3 className="group-hover:text-blue-400 text-xl font-bold text-white  transition-colors">
            {pokemon.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2 justify-center items-center">
            {pokemon.types.map((t) => (
              <Badge
                key={t.type.url}
                variant="outline"
                className={`${
                  typeStyles[t.type.name as keyof typeof typeStyles] ||
                  typeStyles.normal
                } capitalize font-medium flex items-center gap-1 px-3 py-1 select-none`}
              >
                <span className="text-xs">
                  {typeIcons[t.type.name as keyof typeof typeIcons] ||
                    typeIcons.normal}
                </span>
                {t.type.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
