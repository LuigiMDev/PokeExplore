"use client";
import { Button } from "@/components/ui/button";
import { DetailedPokemon } from "@/types/pokemon";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = ({ pokemon }: { pokemon: DetailedPokemon }) => {
  const [playingCry, setPlayingCry] = useState(false);
  const router = useRouter();
  const playCry = () => {
    if (pokemon?.cries?.latest) {
      setPlayingCry(true);
      const audio = new Audio(pokemon.cries.latest);
      audio.addEventListener("ended", () => setPlayingCry(false));
      audio.play();
    }
  };
  return (
    <header className=" z-50 glass-card border-b border-slate-700/50 bg-slate-900 shadow-xl">
      <div className=" px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="flex items-center gap-2 "
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Button>
          <div className="flex items-center gap-3">
            {pokemon.cries?.latest && (
              <Button
                variant="default"
                onClick={playCry}
                disabled={playingCry}
                className="flex items-center gap-2"
              >
                {playingCry ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {playingCry ? "Reproduzindo..." : "Ouvir Grito"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
