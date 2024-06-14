"use client";
import { useState } from "react";
import SignUpPage  from "../components/SignUpPage"// Zmodyfikuj ścieżkę w zależności od struktury plików
import  Details  from "./details/page"; // Zmodyfikuj ścieżkę w zależności od struktury plików

export default function Page() {
    //const [isRegisterFinished, setIsRegisterFinished] = useState(false);
  
    return (
      <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
        <SignUpPage />
      </main>
    );
  }

