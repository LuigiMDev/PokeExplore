import React from "react";
import { Ruler, Weight, Zap, Trophy, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PokemonTypes from "@/app/components/PokemonTypes";
import { DetailedPokemon } from "@/types/pokemon";

type PokemonBasicInfoProps = {
  pokemon: DetailedPokemon;
};

export default function PokemonBasicInfo({ pokemon }: PokemonBasicInfoProps) {
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  const mainStats = pokemon.stats?.slice(0, 6) || [];
  const totalStats = mainStats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="space-y-6 max-w-full">
      {/* Nome e Número */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="text-slate-400 border-slate-600">
            #{pokemon.id?.toString().padStart(3, "0")}
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-500/30">
            {pokemon.base_experience} XP Base
          </Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 capitalize">
          {pokemon.name}
        </h1>
        <div className="flex gap-2">
          <PokemonTypes pokemon={pokemon} />
        </div>
      </div>

      {/* Características Físicas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card glow-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Ruler className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Altura</span>
          </div>
          <div className="text-2xl font-bold text-white">{heightInMeters}m</div>
        </div>
        <div className="glass-card glow-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Weight className="w-5 h-5 text-green-400" />
            <span className="text-slate-400 text-sm">Peso</span>
          </div>
          <div className="text-2xl font-bold text-white">{weightInKg}kg</div>
        </div>
      </div>

      {/* Stats Resumidas */}
      <div className="glass-card glow-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Estatísticas Base
        </h3>

        <div className="space-y-3 mb-4">
          {mainStats.map((stat) => (
            <div key={stat.stat.name} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 capitalize">
                  {stat.stat.name.replace("-", " ")}
                </span>
                <span className="font-bold text-white">{stat.base_stat}</span>
              </div>
              <Progress
                value={(stat.base_stat / 255) * 100}
                className="h-2 bg-slate-800"
              />
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-700/50">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">Total</span>
            <span className="text-xl font-black text-white">{totalStats}</span>
          </div>
        </div>
      </div>

      {/* Habilidades Resumidas */}
      <div className="glass-card glow-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Habilidades
        </h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities?.map((abilityObj, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`capitalize px-3 py-1 ${
                abilityObj.is_hidden
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                  : "bg-slate-700/50 text-slate-300 border-slate-600"
              }`}
            >
              {abilityObj.is_hidden && <Sparkles className="w-3 h-3 mr-1" />}
              {abilityObj.ability.name.replace("-", " ")}
            </Badge>
          ))}
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="glass-card glow-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Informações Gerais
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Ordem na Pokédex</span>
            <div className="font-semibold text-white">#{pokemon.order}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
