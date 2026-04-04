import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * WEBHOOK DO CLERK
 * 
 * Este endpoint sincroniza eventos de usuários do Clerk com o banco de dados.
 * 
 * Configuração no Clerk Dashboard:
 * 1. Vá para Webhooks
 * 2. Adicione um novo webhook
 * 3. URL: https://seu-dominio.com/api/webhooks/clerk
 * 4. Selecione os eventos: user.created, user.updated, user.deleted
 * 5. Copie a chave de assinatura em CLERK_WEBHOOK_SECRET
 * 
 * Eventos suportados:
 * - user.created: Novo usuário criado
 * - user.updated: Usuário foi atualizado
 * - user.deleted: Usuário foi deletado
 */

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      console.error("CLERK_WEBHOOK_SECRET não está definido");
      return new Response("Webhook secret not configured", {
        status: 500,
      });
    }

    // Obter headers
    const headersList = await headers();
    const svixId = headersList.get("svix-id");
    const svixTimestamp = headersList.get("svix-timestamp");
    const svixSignature = headersList.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("Headers do Svix não encontrados");
      return new Response("Missing svix headers", {
        status: 400,
      });
    }

    // Obter body
    const body = await req.json();

    // Verificar assinatura
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    try {
      evt = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (err) {
      console.error("Falha na verificação da assinatura do webhook", err);
      return new Response("Invalid signature", {
        status: 400,
      });
    }

    // Processar eventos
    const eventType = evt.type;
    console.log(`Webhook recebido: ${eventType}`, evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id: clerkId,
        email_addresses,
        first_name,
        last_name,
        username,
        image_url,
      } = evt.data;

      const email = email_addresses[0]?.email_address;

      if (!email) {
        console.warn("Email não encontrado para usuário", clerkId);
        return new Response("Email required", { status: 400 });
      }

      // Verificar se usuário já existe
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, clerkId))
        .limit(1);

      if (existingUser.length > 0 && eventType === "user.updated") {
        // Atualizar usuário existente
        await db
          .update(users)
          .set({
            email,
            username: username || null,
            fullName: `${first_name || ""} ${last_name || ""}`.trim() || null,
            avatarUrl: image_url || null,
          })
          .where(eq(users.clerkId, clerkId));

        console.log("Usuário atualizado:", clerkId);
      } else if (eventType === "user.created") {
        // Criar novo usuário
        try {
          await db.insert(users).values({
            clerkId,
            email,
            username: username || null,
            fullName: `${first_name || ""} ${last_name || ""}`.trim() || null,
            avatarUrl: image_url || null,
            role: "student",
            isActive: true,
          });

          console.log("Novo usuário criado:", clerkId);
        } catch (err) {
          // Usuário pode ter sido criado em outra requisição
          console.warn("Usuário pode já existir", err);
        }
      }
    } else if (eventType === "user.deleted") {
      const { id: clerkId } = evt.data;

      // Marcar como inativo em vez de deletar
      // Isso preserva o histórico e as relações
      await db
        .update(users)
        .set({
          isActive: false,
        })
        .where(eq(users.clerkId, clerkId));

      console.log("Usuário marcado como inativo:", clerkId);
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Erro ao processar webhook:", err);
    return new Response("Internal server error", {
      status: 500,
    });
  }
}
