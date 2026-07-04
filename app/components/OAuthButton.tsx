"use client";

import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

export default function OAuthButton({ icon, text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900/70
            py-3
            transition
            hover:bg-zinc-800
            hover:border-zinc-600
            active:scale-95
            "
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
