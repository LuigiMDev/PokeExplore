import React from "react";
import { TrendingUp, Zap } from "lucide-react";
import { PokemonStat } from "@/types/pokemon";

const statIcons = {
  hp: "❤️",
  attack: "⚔️",
  defense: "🛡️",
  "special-attack": "✨",
  "special-defense": "💎",
  speed: "⚡",
};

const statColors = {
  hp: "text-red-400 bg-red-500",
  attack: "text-orange-400 bg-orange-500",
  defense: "text-blue-400 bg-blue-500",
  "special-attack": "text-purple-400 bg-purple-500",
  "special-defense": "text-green-400 bg-green-500",
  speed: "text-yellow-400 bg-yellow-500",
};

export default function PokemonStatsDetailed({
  stats,
}: {
  stats: PokemonStat[];
}) {
  const maxStat = 255;
  const total = stats?.reduce((sum, stat) => sum + stat.base_stat, 0) || 0;
  const average = Math.round(total / (stats?.length || 1));

  // Determinar ranking da estatística
  const getStatRank = (value: number) => {
    if (value >= 150) return "Excepcional";
    if (value >= 120) return "Muito Alto";
    if (value >= 90) return "Alto";
    if (value >= 60) return "Médio";
    if (value >= 30) return "Baixo";
    return "Muito Baixo";
  };

  return (
    <div className="glass-card glow-border rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-400" />
        Estatísticas Detalhadas
      </h3>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {stats?.map((stat) => (
          <div key={stat.stat.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {statIcons[stat.stat.name as keyof typeof statIcons] || "📊"}
                </span>
                <span className="font-semibold text-slate-200 capitalize">
                  {stat.stat.name.replace("-", " ")}
                </span>
              </div>
              <div className="text-right">
                <div
                  className={`text-xl font-bold ${
                    statColors[
                      stat.stat.name as keyof typeof statColors
                    ]?.split(" ")[0] || "text-white"
                  }`}
                >
                  {stat.base_stat}
                </div>
                <div className="text-xs text-slate-400">
                  {getStatRank(stat.base_stat)}
                </div>
              </div>
            </div>
            <div className="relative w-full h-3 bg-slate-800/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  statColors[stat.stat.name as keyof typeof statColors] ||
                  "bg-slate-500"
                }`}
                style={{ width: `${(stat.base_stat / maxStat) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-slate-400">
              <span>0</span>
              <span>{maxStat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-800/30 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">{total}</div>
          <div className="text-sm text-slate-400">Total Base</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {average}
          </div>
          <div className="text-sm text-slate-400">Média</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {Math.max(...(stats?.map((s) => s.base_stat) || [0]))}
          </div>
          <div className="text-sm text-slate-400">Maior Stat</div>
        </div>
      </div>

      {/* Análise */}
      <div className="mt-6 p-4 bg-slate-800/20 rounded-xl">
        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Análise Rápida
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Melhor Atributo:</span>
            <div className="font-semibold text-green-400 capitalize">
              {stats
                ?.reduce((prev, current) =>
                  prev.base_stat > current.base_stat ? prev : current
                )
                ?.stat?.name?.replace("-", " ") || "N/A"}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Tipo de Build:</span>
            <div className="font-semibold text-blue-400">
              {(() => {
                if (!stats) return "N/A";
                const attack =
                  stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
                const spAttack =
                  stats.find((s) => s.stat.name === "special-attack")
                    ?.base_stat || 0;
                const defense =
                  stats.find((s) => s.stat.name === "defense")?.base_stat || 0;
                const spDefense =
                  stats.find((s) => s.stat.name === "special-defense")
                    ?.base_stat || 0;
                const speed =
                  stats.find((s) => s.stat.name === "speed")?.base_stat || 0;

                if (speed > 110) return "Velocista";
                if (Math.max(attack, spAttack) > Math.max(defense, spDefense))
                  return "Atacante";
                if (Math.max(defense, spDefense) > Math.max(attack, spAttack))
                  return "Tanque";
                return "Balanceado";
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
