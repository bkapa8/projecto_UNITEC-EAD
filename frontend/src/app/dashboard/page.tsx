import { Header } from "@/components/Header";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BarChart3, BookOpen, Clock, Trophy } from "lucide-react";

/**
 * ROTA PROTEGIDA: /dashboard
 * 
 * Esta página demonstra como criar rotas protegidas que requerem autenticação.
 * O middleware.ts garante que apenas usuários autenticados possam acessar esta rota.
 * 
 * Para adicionar mais rotas protegidas:
 * 1. Crie um novo diretório em src/app/ (ex: src/app/profile/)
 * 2. Middleware protegerá automaticamente porque começa com /
 * 3. Use currentUser() para acessar dados do usuário autenticado
 */

export default async function DashboardPage() {
  const user = await currentUser();

  // Garantir que o usuário está autenticado (redundante, mas seguro)
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Welcome Section */}
        <section className="border-b border-slate-800 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Bem-vindo, {user.firstName || user.username || "Aluno"}!
                </h1>
                <p className="mt-2 text-slate-400">
                  Vamos retomar sua jornada de aprendizado
                </p>
              </div>

              {/* User Info Card */}
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.firstName || "Usuário"}
                  className="h-16 w-16 rounded-full border-2 border-slate-700"
                />
              )}
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-xl font-semibold text-white">Seu Progresso</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Stat Card 1 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Cursos em Progresso</p>
                    <p className="mt-2 text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Horas Aprendidas</p>
                    <p className="mt-2 text-2xl font-bold text-white">0h</p>
                  </div>
                  <div className="rounded-lg bg-purple-500/10 p-3">
                    <Clock className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Vídeos Concluídos</p>
                    <p className="mt-2 text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="rounded-lg bg-green-500/10 p-3">
                    <Trophy className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Pontos Acumulados</p>
                    <p className="mt-2 text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="rounded-lg bg-yellow-500/10 p-3">
                    <BarChart3 className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty State */}
        <section className="border-t border-slate-800 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-xl font-semibold text-white">Comece a Aprender</h2>

            <div className="rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/30 p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-slate-500" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                Nenhum curso em progresso
              </h3>
              <p className="mt-2 text-slate-400">
                Explore nosso catálogo de cursos e comece sua jornada de aprendizado hoje.
              </p>
              <a
                href="#"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Explorar Cursos
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
