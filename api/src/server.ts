import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { renderTrpcPanel } from "trpc-panel";
import { createContext, router } from "./index";

export const server = fastify({
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
    url: "http://127.0.0.1:3000/trpc",
    transformer: "superjson",
  });
});
