import { SignIn } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
              UniTec EAD
            </span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm text-slate-400">
            Não tem conta?{" "}
            <Link href="/sign-up" className="font-medium text-blue-400 hover:text-blue-300">
              Cadastre-se
            </Link>
          </p>
        </div>

        {/* Clerk SignIn Component */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 backdrop-blur">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none bg-transparent border-0",
                formFieldInput:
                  "border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:border-blue-500",
                formFieldLabel: "text-slate-300 font-medium",
                footerAction: "text-slate-400",
                footerActionLink: "text-blue-400 hover:text-blue-300",
                dividerLine: "bg-slate-700",
                dividerText: "text-slate-400",
                socialButtonsBlockButton:
                  "border-slate-700 bg-slate-800 text-white hover:bg-slate-700",
                socialButtonsBlockButtonText: "font-medium",
                formButtonPrimary:
                  "bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors",
                backButton: "text-slate-400 hover:text-slate-200",
                headerTitle: "text-white font-bold",
                headerSubtitle: "text-slate-400",
                identityPreview: "bg-slate-800 border-slate-700",
              },
            }}
            redirectUrl="/dashboard"
          />
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-slate-500">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
