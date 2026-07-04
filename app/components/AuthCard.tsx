"use client";

import Link from "next/link";
import OAuthButton from "./OAuthButton";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
  signup?: boolean;
}

export default function AuthCard({ signup }: Props) {
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (response) => {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      const data = await res.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    },
  });

  return (
    <div
      className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            p-8
            shadow-2xl
            "
    >
      <h1 className="text-4xl font-bold text-center">
        {signup ? "Create Account" : "Welcome Back"}
      </h1>

      <p className="text-center text-zinc-400 mt-2">
        Continue with your favorite provider
      </p>

      <div className="space-y-4 mt-8">
        <OAuthButton
          text="Continue with Google"
          icon={<FaGoogle />}
          onClick={() => googleLogin()}
        />
        <OAuthButton text="Continue with GitHub" icon={<FaGithub />} />

        <OAuthButton text="Continue with Microsoft" icon={<FaMicrosoft />} />
      </div>

      <div className="flex items-center gap-3 my-8">
        <div className="h-px bg-zinc-700 flex-1" />
        <span className="text-zinc-500 text-sm">or</span>
        <div className="h-px bg-zinc-700 flex-1" />
      </div>

      <div className="space-y-4">
        {signup && (
          <input
            placeholder="Full Name"
            className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 outline-none focus:border-indigo-500"
          />
        )}

        <input
          placeholder="Email"
          type="email"
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 outline-none focus:border-indigo-500"
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 outline-none focus:border-indigo-500"
        />

        {!signup && (
          <div className="flex justify-between text-sm">
            <label className="flex gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link href="/forgot-password" className="text-indigo-400">
              Forgot password?
            </Link>
          </div>
        )}

        <button
          className="
                    w-full
                    rounded-xl
                    bg-indigo-600
                    py-3
                    font-semibold
                    hover:bg-indigo-500
                    transition
                    "
        >
          {signup ? "Create Account" : "Login"}
        </button>
      </div>

      <p className="text-center mt-8 text-zinc-400">
        {signup ? "Already have an account?" : "Don't have an account?"}

        <Link
          href={signup ? "/login" : "/signup"}
          className="text-indigo-400 ml-2"
        >
          {signup ? "Login" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
}
