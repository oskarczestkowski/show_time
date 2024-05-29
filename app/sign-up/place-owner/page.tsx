"use client"
import { useState } from "react";
import { RegisterPage } from "./RegisterPage";
import { Details } from "./Details";

export default async function page(
) {
  const [isRegisterFinished, setIsRegisterFinished] = useState(false)

  return (
    <main className="flex-1 my-4 flex m-auto flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
      {isRegisterFinished ?
        <RegisterPage setIsRegisterFinished={setIsRegisterFinished} /> :
        <Details />}
    </main>
  );
}
