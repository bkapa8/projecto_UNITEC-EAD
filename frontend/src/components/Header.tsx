"use client";

import Link from "next/link";
import { Search, BookOpen } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButtonWrapper } from "./UserButtonWrapper";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              UniTec EAD
            </span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 max-w-md mx-8 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar cursos..."
                className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-50 placeholder-slate-400 transition-colors hover:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation & Auth */}
          <nav className="flex items-center gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Cadastro
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="hidden sm:inline-block text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                Dashboard
              </Link>
              <UserButtonWrapper />
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}
