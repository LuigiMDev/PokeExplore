"use client";
import { Button } from "@/components/ui/button";
import { pokemonStore } from "@/zustand/pokemonStore";
import Image from "next/image";

export default function Home() {
  const pokemons = pokemonStore((state) => state.pokemons);
  return (
    <>
      <section
        className="min-h-screen w-full mx-auto relative flex items-center p-8"
        style={{
          backgroundImage: `url(./hero_banner.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black/30 absolute inset-0 z-10" />
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
      <section className="min-h-screen">
        {pokemons.results.map((pokemon) => (
          <div key={pokemon.id} className="p-4 border-b border-slate-800">
            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <div className="flex space-x-4 mt-2">
              {pokemon.sprites.front_default && (
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              )}
              <div className="flex space-x-2">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm capitalize"
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
