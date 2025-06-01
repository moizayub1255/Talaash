import { httpAction } from "./_generated/server";

export const clerkWebhook = httpAction(async (ctx, request) => {
  const body = await request.json();
  console.log("📦 Clerk Event Received:", body);
  return new Response(null, { status: 200 });
});
