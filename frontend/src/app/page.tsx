import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { ArrowRight, BookOpen, Play, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Aprenda com as melhores{" "}
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  vídeoaulas do YouTube
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                Cursos estruturados, progresso rastreado e comunidade engajada.
                Transforme seus vídeos favoritos em uma jornada de aprendizado completa.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    Começar a aprender
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-8 py-3 font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800/50 hover:text-white"
                  >
                    Criar conta
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    Ir para Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </SignedIn>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">100+</div>
                <p className="mt-2 text-slate-400">Cursos Disponíveis</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">10K+</div>
                <p className="mt-2 text-slate-400">Alunos Ativos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">1000+</div>
                <p className="mt-2 text-slate-400">Horas de Vídeo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Por que escolher UniTec EAD?
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/80">
                <div className="inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-3">
                  <Play className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mt-4 font-semibold text-white">Vídeoaulas Selecionadas</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Conteúdo de qualidade do YouTube organizado em cursos estruturados
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/80">
                <div className="inline-flex items-center justify-center rounded-lg bg-purple-500/10 p-3">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mt-4 font-semibold text-white">Rastreamento de Progresso</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Acompanhe seu avanço e marque vídeos como concluídos
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/80">
                <div className="inline-flex items-center justify-center rounded-lg bg-cyan-500/10 p-3">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="mt-4 font-semibold text-white">Cursos Inteligentes</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Sugestões personalizadas baseadas no seu progresso
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/80">
                <div className="inline-flex items-center justify-center rounded-lg bg-pink-500/10 p-3">
                  <Users className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="mt-4 font-semibold text-white">Comunidade</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Conecte-se com outros alunos e compartilhe experiências
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-800 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">
              Pronto para começar sua jornada de aprendizado?
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Acesso gratuito a todos os cursos. Sem cartão de crédito necessário.
            </p>

            <SignedOut>
              <Link
                href="/sign-up"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Criar conta gratuita
                <ArrowRight className="h-5 w-5" />
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Acessar cursos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-400">
          <p>© 2026 UniTec EAD. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
