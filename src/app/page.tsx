"use client";
import { Button } from "@/components/ui/button";
import { pokemonStore } from "@/zustand/pokemonStore";
import PokemonCard from "./components/PokemonCard";
import FilterCard from "@/components/FilterCard";
import { useShallow } from "zustand/shallow";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [pokemons, isLoading] = pokemonStore(
    useShallow((state) => [state.pokemons, state.isLoading])
  );

  return (
    <>
      <section
        className="min-h-[100dvh] w-full mx-auto relative flex items-center p-8"
        style={{
          backgroundImage: `url(/hero_banner.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black/30 absolute inset-0 z-10" />
        <div className="bg-gradient-to-b from-slate-950/0 via-slate-950 to-slate-950/0 absolute -bottom-10 z-20 h-20 w-full left-0"></div>
        <div className="max-w-2xl relative z-20 text-white overflow-hidden space-y-10 text-center md:text-left w-full">
          <h1 className="text-4xl md:text-6xl font-bold md:leading-18">
            Explore o Mundo de <br /> Pokémon
          </h1>
          <p className="text-lg md:text-xl">
            Explore o Mundo de Pokémon Descubra informações detalhadas,
            estatísticas e factos fascinantes sobre todos os seus Pokémon
            favoritos. Mergulhe no mundo de Pokémon com a nossa plataforma
            moderna e elegante.
          </p>
          <Button className="text-lg px-5 py-6" asChild>
            <a href="#pokemonList">Explore Agora</a>
          </Button>
        </div>
      </section>
      <section id="pokemonList" className="scroll-mt-24 space-y-4">
        <FilterCard />

        <div className="mx-8">
          <Badge variant={"cards"} className="bg-primary/60">
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              `${pokemons.count} pokémon${
                pokemons.count === 1 ? "" : "s"
              } encontrado${pokemons.count === 1 ? "" : "s"}`
            )}
          </Badge>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-8 content-center">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className={`text-white relative bg-slate-900 hover:scale-[1.02] transition-all border-slate-800/50 border-2 group cursor-pointer duration-300 hover:shadow-2xl`}
                >
                  <CardContent className="relative capitalize">
                    <Skeleton className="h-5 w-9" />
                    <div className="flex flex-col items-center text-center transition-all space-y-4">
                      <Skeleton className="rounded-full shadow-lg h-32 w-32" />
                      <Skeleton className="w-26 h-7" />
                      <div className="flex flex-wrap gap-2 mt-2 justify-center items-center">
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-20 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : pokemons.count === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-24">
            <div className="rounded-full p-5 mb-6 bg-slate-800">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-2xl text-white font-semibold">
              Nenhum Pokémon encontrado
            </p>
            <p className="text-slate-400">
              Tente ajustar os filtros de pesquisa
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-8 content-center">
            {pokemons.results.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
