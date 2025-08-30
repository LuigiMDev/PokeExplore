import React from "react";
import AIGuessGame from "./AIGuessGame";
import BackButton from "../pokemon/[id]/components/BackButton";

export default function AIGamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <BackButton />
        <div className="relative text-center mb-12">
          {/* Glow effect */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl rounded-full" />

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Quem é esse Pokémon?
          </h1>

          <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Desafie a inteligência artificial para descobrir o Pokémon secreto
            do dia!
          </p>
        </div>

        {/* Game */}
        <AIGuessGame />
      </div>
    </div>
  );
}
