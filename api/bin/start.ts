import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { renderTrpcPanel } from "trpc-panel";
import { createContext, router } from "../src/index.js";

async function main() {
  const server = fastify({
    maxParamLength: 5000,
  });

  server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      createContext,
      router,
    },
  });

  server.get("/trpc-panel", async (_, res) => {
    res.type("text/html");

    return renderTrpcPanel(router, {
      url: "http://localhost:3000/trpc",
      transformer: "superjson",
    });
  });

  return server.listen({ port: 3000 });
}

main()
  .then((address) => {
    console.log(`Listening on ${address}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
