"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function Backbutton() {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()}>
      <ChevronLeft className="w-4 h-4" />
    </Button>
  );
}

export default Backbutton;
