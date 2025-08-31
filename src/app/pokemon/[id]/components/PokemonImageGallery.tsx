/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DetailedPokemon } from "@/types/pokemon";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function PokemonImageGallery({
  pokemon,
}: {
  pokemon: DetailedPokemon;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Organizar sprites por categoria
  const getImageCategories = () => {
    const categories: {
      name: string;
      images: { url: string; label: string }[];
    }[] = [];

    const addImage = (url?: string, label?: string) =>
      url ? { url, label: label || "" } : null;

    // Official Artwork (principal)
    const official = pokemon.sprites?.other?.["official-artwork"];
    if (official?.front_default) {
      categories.push({
        name: "Artwork Oficial",
        images: [
          addImage(official.front_default, "Normal"),
          addImage(official.front_shiny, "Shiny"),
        ].filter(Boolean) as { url: string; label: string }[],
      });
    }

    // Home sprites
    const home = pokemon.sprites?.other?.home;
    if (home?.front_default) {
      categories.push({
        name: "Pokémon HOME",
        images: [
          addImage(home.front_default, "Normal"),
          addImage(home.front_shiny, "Shiny"),
        ].filter(Boolean) as { url: string; label: string }[],
      });
    }

    // Showdown (animados)
    const showdown = pokemon.sprites?.other?.showdown;
    if (showdown?.front_default) {
      categories.push({
        name: "Showdown",
        images: [
          addImage(showdown.front_default, "Normal - Frente"),
          addImage(showdown.back_default, "Normal - Costas"),
          addImage(showdown.front_shiny, "Shiny - Frente"),
          addImage(showdown.back_shiny, "Shiny - Costas"),
        ].filter(Boolean) as { url: string; label: string }[],
      });
    }

    // Sprites básicos
    categories.push({
      name: "Sprites Básicos",
      images: [
        addImage(pokemon.sprites?.front_default, "Normal - Frente"),
        addImage(pokemon.sprites?.back_default, "Normal - Costas"),
        addImage(pokemon.sprites?.front_shiny, "Shiny - Frente"),
        addImage(pokemon.sprites?.back_shiny, "Shiny - Costas"),
      ].filter(Boolean) as { url: string; label: string }[],
    });

    return categories.filter((cat) => cat.images.length > 0);
  };

  const imageCategories = getImageCategories();
  const allImages = imageCategories.flatMap((cat) =>
    cat.images.map((img) => ({ ...img, category: cat.name }))
  );

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );

  const currentImage = allImages[currentImageIndex];

  return (
    <div className="space-y-4 w-full">
      {/* Main Image Display */}
      <div className="glass-card glow-border rounded-2xl p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
        <div className="relative w-full h-96 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl flex items-center justify-center overflow-hidden select-none">
          {currentImage?.url ? (
            <img
              src={currentImage.url}
              alt={`${pokemon.name} ${currentImage.label}`}
              className="w-auto h-full object-contain"
            />
          ) : (
            <span className="text-white">Sem imagem</span>
          )}

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </Button>
            </>
          )}

          {/* Image Info */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <Badge
                variant="outline"
                className="bg-black/40 text-white border-white/20 mb-2"
              >
                {currentImage?.category}
              </Badge>
              <p className="text-white text-sm bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                {currentImage?.label}
              </p>
            </div>
            {currentImage?.label?.includes("Shiny") && (
              <Sparkles className="w-6 h-6 text-yellow-400" />
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="rounded-xl select-none">
        <ScrollArea className="w-full overflow-x-auto">
          <div className="flex gap-2 mb-3">
            {allImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden relative cursor-pointer ${
                  currentImageIndex === index
                    ? "border-blue-500 ring-2 ring-blue-500/30"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <img
                  src={image.url}
                  alt={`${pokemon.name} thumbnail`}
                  className="w-full h-full object-contain bg-slate-800/50"
                />
                {image.label?.includes("Shiny") && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
          <ScrollBar className="text-red-500" orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Image Counter */}
      <div className="text-center">
        <Badge
          variant="outline"
          className="bg-slate-800/50 text-slate-300 border-slate-600"
        >
          {currentImageIndex + 1} de {allImages.length}
        </Badge>
      </div>
    </div>
  );
}
