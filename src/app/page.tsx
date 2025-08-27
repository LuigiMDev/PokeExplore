"use client";
import { Button } from "@/components/ui/button";
import { pokemonStore } from "@/zustand/pokemonStore";
import PokemonCard from "./components/PokemonCard";

export default function Home() {
  const pokemons = pokemonStore((state) => state.pokemons);
  return (
    <>
      <section
        className="min-h-[100dvh] w-full mx-auto relative flex items-center p-8"
        style={{
          backgroundImage: `url(./hero_banner.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black/30 absolute inset-0 z-10" />
        <div className="bg-gradient-to-b from-slate-950/0 via-slate-950 to-slate-950/0 absolute -bottom-10 z-20 h-20 w-full left-0"></div>
        <div className="max-w-2xl relative z-20 text-white overflow-hidden space-y-10 text-center md:text-left w-full">
          <h1 className="text-6xl font-bold leading-18">
            Explore o Mundo de <br /> Pokémon
          </h1>
          <p className="text-xl ">
            Explore o Mundo de Pokémon Descubra informações detalhadas,
            estatísticas e factos fascinantes sobre todos os seus Pokémon
            favoritos. Mergulhe no mundo de Pokémon com a nossa plataforma
            moderna e elegante.
          </p>
          <Button className="text-lg px-5 py-6">Explore Agora</Button>
        </div>
      </section>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 p-8 content-center">
        {pokemons.results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
}
