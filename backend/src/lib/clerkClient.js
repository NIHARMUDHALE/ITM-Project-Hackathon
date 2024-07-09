import { createClerkClient } from "@clerk/clerk-sdk-node";
import "dotenv/config";

console.log(process.env.CLERK_SECRET_KEY);
export const clerksClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
