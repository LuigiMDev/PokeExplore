import React from "react";
import { Sparkles, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PokemonAbility } from "@/types/pokemon";

export default function PokemonAbilities({
  abilities,
}: {
  abilities: PokemonAbility[];
}) {
  return (
    <div className="glass-card glow-border rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-purple-400" />
        Habilidades
      </h3>

      <div className="space-y-4">
        {abilities?.map((abilityObj, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${
              abilityObj.is_hidden
                ? "bg-purple-500/10 border-purple-500/30"
                : "bg-slate-800/50 border-slate-600/50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {abilityObj.is_hidden && (
                  <Sparkles className="w-4 h-4 text-purple-400" />
                )}
                <h4 className="font-bold text-white capitalize text-lg">
                  {abilityObj.ability.name.replace("-", " ")}
                </h4>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    abilityObj.is_hidden
                      ? "text-purple-400 border-purple-500/50"
                      : "text-slate-400 border-slate-500/50"
                  }`}
                >
                  Slot {abilityObj.slot}
                </Badge>
                {abilityObj.is_hidden && (
                  <Badge className="bg-purple-600 text-white text-xs">
                    Oculta
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {abilityObj.is_hidden
                ? "Habilidade especial que pode ser obtida através de métodos específicos como Dream World ou habilidades especiais."
                : "Habilidade padrão que o Pokémon pode possuir naturalmente."}
            </p>
          </div>
        ))}
      </div>

      {/* Informação sobre Habilidades */}
      <div className="mt-6 p-4 bg-slate-800/20 rounded-xl">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-slate-300">
            <p className="font-medium text-white mb-1">Sobre as Habilidades:</p>
            <p>
              Habilidades{" "}
              <span className="text-purple-400 font-medium">ocultas</span> são
              especiais e geralmente mais raras. Cada Pokémon pode ter apenas
              uma habilidade ativa por vez em batalha.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
