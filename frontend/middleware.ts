import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/public(.*)",
]);

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/course(.*)",
  "/api/protected(.*)",
  "/playlist(.*)",
  "/profile(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  // Allow public routes without authentication
  if (isPublicRoute(req)) {
    return;
  }

  // Require authentication for protected routes
  if (isProtectedRoute(req) && !userId) {
    return (await auth()).redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip internal files and assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|cur|heic|heif|webmanifest)(?:$|\\?)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
