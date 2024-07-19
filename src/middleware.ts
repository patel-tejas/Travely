import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

const ignoredRoutes = createRouteMatcher(["/api/webhooks(.*)", "/"])
export default clerkMiddleware((auth, request) => {

  if(!isPublicRoute(request) && !ignoredRoutes(request)) {
    auth().protect();
  }

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
