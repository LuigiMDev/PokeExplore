import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Setter from "@/components/Setter";
import { ToastContainer } from "react-toastify";
import { getPokemons } from "./api/lib/getPokemons";
import { PokemonResponse } from "@/types/pokemon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: {
    default: "PokeExplore",
    template: "%s - PokeExplore",
  },
  description:
    "Explore Pokémons com PokeExplore, veja detalhes, sprites e jogue 'Quem é esse Pokémon?' com IA.",
  openGraph: {
    title: "PokeExplore",
    description:
      "Explore Pokémons com PokeExplore, veja detalhes, sprites e jogue 'Quem é esse Pokémon?' com IA.",
    siteName: "PokeExplore",
    images: ["/logo.png"],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokeExplore",
    description:
      "Explore Pokémons com PokeExplore, veja detalhes, sprites e jogue 'Quem é esse Pokémon?' com IA.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initalPokemonsData: PokemonResponse;
  try {
    initalPokemonsData = await getPokemons();
  } catch {
    initalPokemonsData = { count: 0, results: [] };
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Setter initialPokemonsData={initalPokemonsData}>
          <main className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {children}
          </main>
        </Setter>
        <ToastContainer position="bottom-right" pauseOnHover />
      </body>
    </html>
  );
}
