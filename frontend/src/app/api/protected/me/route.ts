import { NextResponse } from "next/server";
import { getCurrentUser, unauthorized } from "@/lib/auth";

/**
 * EXEMPLO DE ROTA API PROTEGIDA
 * 
 * GET /api/protected/me
 * 
 * Retorna os dados do usuário autenticado
 */
export async function GET() {
  try {
    const { userId, user } = await getCurrentUser();

    if (!userId || !user) {
      return unauthorized();
    }

    return NextResponse.json({
      userId,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
