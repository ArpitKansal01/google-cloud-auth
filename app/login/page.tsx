"use client";
import { useEffect } from "react";
import AuthCard from "../components/AuthCard";

export default function LoginPage() {

  
  return (
    <main
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-linear-to-br
            from-black
            via-zinc-900
            to-indigo-950
            text-white
            p-6
            "
    >
      <AuthCard />
    </main>
  );
}
