"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant="outline">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Voltar
    </Button>
  );
};

export default BackButton;
