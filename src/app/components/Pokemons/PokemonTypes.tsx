import { pokemonTypes } from "@/app/utils/Pokemons";
import { Badge } from "@/components/ui/badge";
import { Pokemon } from "@/types/pokemon";

import React from "react";

const PokemonTypes = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center items-center">
      {pokemon.types.map((t) => (
        <Badge
          key={t.type.url}
          variant="outline"
          className={`${
            pokemonTypes[t.type.name as keyof typeof pokemonTypes].style ||
            pokemonTypes.normal.style
          } capitalize font-medium flex items-center gap-1 px-3 py-1 select-none`}
        >
          <span className="text-xs">
            {pokemonTypes[t.type.name as keyof typeof pokemonTypes].icon ||
              pokemonTypes.normal.icon}
          </span>
          {pokemonTypes[t.type.name as keyof typeof pokemonTypes].display}
        </Badge>
      ))}
    </div>
  );
};

export default PokemonTypes;
