import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./router";

import { env } from "./env"

const urlFromEnv = () => {
  if (env.ENVIRONMENT === "production") {
    return env.DOMAIN
  }

  if (env.ENVIRONMENT === "development") {
    return "http://0.0.0.0:3000";
  }

}

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "solana-trpc",
  description: "API service for RPC calls",
  version: "0.0.0",
  baseUrl: urlFromEnv() + "/api",
  tags: ["rpc"],
});
