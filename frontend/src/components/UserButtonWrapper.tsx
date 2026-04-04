"use client";

import { UserButton } from "@clerk/nextjs";

/**
 * Wrapper para o UserButton do Clerk
 * Necessário usar "use client" pois o UserButton é um componente interativo
 * Centraliza a configuração do UserButton em um único lugar
 */
export function UserButtonWrapper() {
  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: "h-9 w-9",
        },
      }}
    />
  );
}
