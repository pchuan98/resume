import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/count": {
      async GET(req) {
        return Response.json({
          count: 1,
          method: "GET",
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);

// console.log(await getCardCount());
