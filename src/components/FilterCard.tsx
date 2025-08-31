import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Layers, Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { pokemonTypes } from "@/app/utils/Pokemons";
import { Badge } from "@/components/ui/badge";
import { pokemonStore } from "@/zustand/pokemonStore";
import { AppError } from "@/utils/AppError";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";
import { PaginationController } from "./PaginationController";

const FilterCard = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const [
    pokemons,
    selectedType,
    setSelectedType,
    searchInput,
    setSearchInput,
    currentPage,
    setCurrentPage,
    searchByType,
    searchByInput,
  ] = pokemonStore(
    useShallow((state) => [
      state.pokemons,
      state.selectedType,
      state.setSelectedType,
      state.searchInput,
      state.setSearchInput,
      state.currentPage,
      state.setCurrentPage,
      state.searchByType,
      state.searchByInput,
    ])
  );

  const handleFilterByType = (pokemonType: string) => {
    try {
      setCurrentPage(1);
      setSearchInput("");
      setSelectedType(pokemonType);
      searchByType();
    } catch (err) {
      if (err instanceof AppError) {
        return toast.error(err.message);
      }
      toast.error("Ocorreu um erro ao buscar os pokémons!");
    }
  };

  const onPageChange = (page: number) => {
    try {
      setCurrentPage(page);

      searchByType();
    } catch (err) {
      if (err instanceof AppError) {
        return toast.error(err.message);
      }
      toast.error("Ocorreu um erro ao buscar os pokémons!");
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSelectedType("");
      searchByInput();
      setCurrentPage(1);
    } catch (err) {
      if (err instanceof AppError) {
        return toast.error(err.message);
      }
      toast.error("Ocorreu um erro ao buscar os pokémons!");
    }
  };

  return (
    <Card className="text-white bg-slate-900 transition-all border-slate-800/50 border-2 group duration-300 hover:shadow-2xl mt-10 mx-6">
      <CardContent>
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Input
              className="border-slate-600 pl-10 py-6 placeholder:text-slate-400 "
              placeholder="Pesquisar Pokémon por nome exato ou id..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </form>
        <div className="transition-all w-full flex flex-col">
          <div className="flex justify-between flex-wrap items-center gap-y-4">
            <Button
              className="w-fit"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <Filter /> Filtros
            </Button>

            <PaginationController
              currentPage={currentPage}
              totalPages={Math.ceil(pokemons.count / 30)}
              onPageChange={onPageChange}
            />
          </div>

          <div
            className={`w-full transition-all duration-300  ${
              openFilter ? "max-h-[1000px] mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className={`h-[1px] w-full bg-slate-700 mb-4 `}></div>
            <p className="font-semibold text-slate-200 mb-4">
              Filtrar por tipo
            </p>
            <div className={`flex gap-2 flex-wrap `}>
              <Badge
                variant="outline"
                className={` capitalize font-medium flex items-center gap-1 px-3 py-1 select-none cursor-pointer bg-gray-500/20 hover:bg-gray-500/10 text-gray-200 border-gray-500/30 transition-all ${
                  selectedType === ""
                    ? "bg-gray-500/50 scale-110 border-gray-400"
                    : "bg-gray-500/20 hover:bg-gray-500/10 text-gray-200 border-gray-500/30"
                }
  `}
                onClick={() => handleFilterByType("")}
              >
                <span className="">
                  <Layers className="h-3 w-3" />
                </span>
                Todos
              </Badge>
              {Object.entries(pokemonTypes).map(([key, value]) => (
                <Badge
                  key={key}
                  variant="outline"
                  className={`${
                    value.style || pokemonTypes.normal.style
                  } capitalize font-medium flex items-center gap-1 px-3 py-1 select-none cursor-pointer ${
                    selectedType === key
                      ? "scale-110 border-white"
                      : value.style || pokemonTypes.normal.style
                  } transition-all`}
                  onClick={() => handleFilterByType(key)}
                >
                  <span className="text-xs">
                    {value.icon || pokemonTypes.normal.icon}
                  </span>
                  {value.display}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
