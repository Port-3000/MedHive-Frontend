//middleware.ts

import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - about (public about page)
     * - contribute (public contribution page)
     * - model-hub (public model hub)
     * - terms (public terms of service)
     * - privacy (public privacy policy)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|api|about|contribute|model-hub|terms|privacy|$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)",
  ],
};
