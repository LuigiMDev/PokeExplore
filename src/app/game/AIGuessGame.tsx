/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, BrainCircuit } from "lucide-react";
import { Pokemon } from "@/types/pokemon";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIResponse {
  isPokemonCorrect: boolean;
  message: string;
  pokemonOfTheDay: Pokemon;
}

export default function AIGuessGame() {
  const [pokemonOfTheDay, setPokemonOfTheDay] = useState<Pokemon | null>(null);
  const [gameState, setGameState] = useState<
    "loading" | "playing" | "correct" | "already_solved"
  >("loading");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getTodayKey = () => {
    const today = new Date();
    return `pokemonGame_${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
  };

  useEffect(() => {
    const initialize = async () => {
      const todayKey = getTodayKey();
      const savedState = localStorage.getItem(todayKey);

      if (savedState) {
        const { solved, pokemon } = JSON.parse(savedState) as {
          solved: boolean;
          pokemon: Pokemon;
        };

        setPokemonOfTheDay(pokemon);
        setGameState(solved ? "already_solved" : "playing");
        setChatHistory([
          {
            role: "assistant",
            content: solved
              ? `🎉 Parabéns! Você acertou, o Pokémon do dia é ${
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }`
              : "Eu escolhi um Pokémon para hoje. Quem você acha que é?",
          },
        ]);
      } else {
        try {
          const res = await fetch("/api/pokemons/today");
          const pokemonOfTheDay: Pokemon = await res.json();

          setPokemonOfTheDay(pokemonOfTheDay);
          setGameState("playing");
          setChatHistory([
            {
              role: "assistant",
              content: "Eu escolhi um Pokémon para hoje. Quem você acha que é?",
            },
          ]);
        } catch (err) {
          console.error(err);
          setChatHistory([
            {
              role: "assistant",
              content: "Ops! Não consegui carregar o Pokémon de hoje.",
            },
          ]);
        }
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isThinking || gameState !== "playing") return;

    const userMessage: ChatMessage = { role: "user", content: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: currentInput }),
      });
      const data: AIResponse = await response.json();

      setPokemonOfTheDay(data.pokemonOfTheDay);

      if (data.isPokemonCorrect) {
        setGameState("correct");
        localStorage.setItem(
          getTodayKey(),
          JSON.stringify({ solved: true, pokemon: data.pokemonOfTheDay })
        );
      }

      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ops, algo deu errado. Tente novamente.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const mainImage =
    pokemonOfTheDay?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemonOfTheDay?.sprites?.front_default ||
    pokemonOfTheDay?.sprites.other?.home?.front_default;

  if (gameState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-96 glass-card glow-border rounded-2xl">
        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
        <p className="mt-4 text-slate-300">Sorteando o Pokémon do dia...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 items-start bg-slate-900/95 border border-slate-800 rounded-2xl shadow-xl p-6">
      {/* Pokémon Display */}
      <div className="relative w-full h-72 sm:h-80 lg:h-[32rem] flex items-center justify-center rounded-2xl overflow-hidden bg-slate-800/50 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-slate-700/30 pointer-events-none" />
        {mainImage && (
          <img
            src={mainImage}
            alt="Pokémon secreto"
            draggable={false}
            className="w-full h-full object-contain transition-all duration-700"
            style={{
              filter:
                gameState === "correct" || gameState === "already_solved"
                  ? "grayscale(0%) brightness(1)"
                  : "grayscale(100%) brightness(0.15) contrast(1.4)",
            }}
          />
        )}
      </div>

      {/* Chat Interface */}
      <div className="flex flex-col h-[32rem] bg-slate-800/40 rounded-2xl border border-slate-700 p-5 shadow-inner">
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar"
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <BrainCircuit className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow 
              ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-sm"
                  : "bg-slate-700 text-slate-200 rounded-bl-sm"
              }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 justify-start">
              <BrainCircuit className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div className="bg-slate-700 rounded-2xl px-4 py-2">
                <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="mt-4 flex gap-3 items-center"
        >
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              gameState === "playing"
                ? "Digite seu palpite..."
                : "Você já jogou hoje!"
            }
            disabled={gameState !== "playing" || isThinking}
            className="flex-1 bg-slate-900/70 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <Button
            type="submit"
            disabled={gameState !== "playing" || isThinking}
            className="bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
