import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Utilitários para autenticação e autorização
 * 
 * Use essas funções em suas rotas API protegidas
 */

/**
 * Verifica se o usuário está autenticado e retorna seus dados
 * Use em rotas API protegidas
 * 
 * @example
 * const { userId, user } = await getCurrentUser();
 * if (!userId) return unauthorized();
 */
export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return { userId: null, user: null };
  }

  // Buscar dados do usuário no banco
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  return {
    userId,
    user: user[0] || null,
  };
}

/**
 * Verifica se o usuário é um instructor
 * 
 * @example
 * if (!(await isInstructor())) {
 *   return forbidden();
 * }
 */
export async function isInstructor() {
  const { user } = await getCurrentUser();
  return user?.role === "instructor";
}

/**
 * Verifica se o usuário é um admin
 * 
 * @example
 * if (!(await isAdmin())) {
 *   return forbidden();
 * }
 */
export async function isAdmin() {
  const { user } = await getCurrentUser();
  return user?.role === "admin";
}

/**
 * Verifica se o usuário é um student
 */
export async function isStudent() {
  const { user } = await getCurrentUser();
  return user?.role === "student";
}

/**
 * Helper para retornar erro Unauthorized (401)
 */
export function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

/**
 * Helper para retornar erro Forbidden (403)
 */
export function forbidden() {
  return new Response(JSON.stringify({ error: "Forbidden" }), {
    status: 403,
    headers: { "content-type": "application/json" },
  });
}

/**
 * Helper para retornar erro Not Found (404)
 */
export function notFound() {
  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "content-type": "application/json" },
  });
}
