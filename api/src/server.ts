import fastifyCors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { renderTrpcPanel } from "trpc-panel";
import { createContext, router } from "./index";

export const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyCors, {
  origin: "*",
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    createContext,
    router,
  },
});

server.get("/trpc-panel", async (req, res) => {
  res.type("text/html");

  return renderTrpcPanel(router, {
    url: `${req.headers["x-forwarded-scheme"] ?? "http"}://${req.headers["x-forwarded-host"] ?? req.headers.host ?? "127.0.0.1:3000"}/trpc`,
    transformer: "superjson",
  });
});
