/*
  eslint-disable
  @typescript-eslint/no-misused-promises,
  @typescript-eslint/no-unsafe-argument,
  @typescript-eslint/no-explicit-any,
  promise/always-return
 */
  import cors from "@fastify/cors";
  import fastifySwagger from "@fastify/swagger";
  import fastifySwaggerUi from "@fastify/swagger-ui"
  import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
  import Fastify from "fastify";
  import { fastifyTRPCOpenApiPlugin } from "trpc-openapi";
  
  import { openApiDocument } from "./openapi";
  import { appRouter, createContext } from "./router";
  
  const app = Fastify();
  
  async function main() {
    // Setup CORS
    await app.register(cors);
  
    // Handle incoming tRPC requests
    await app.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      useWss: false,
      trpcOptions: { router: appRouter, createContext },
    } as any);
  
    // Handle incoming OpenAPI requests
    await app.register(fastifyTRPCOpenApiPlugin, {
      basePath: "/api",
      router: appRouter,
      createContext,
    });
  
    // Serve the OpenAPI document
    app.get("/openapi.json", () => openApiDocument);
  
    app.get("/", () => {
        return "solana-trpc running"
      }
    )
  
    // Server Swagger UI
    app.register(fastifySwagger, {
      mode: "dynamic",
      openapi: openApiDocument
    });
  
    app.register(fastifySwaggerUi, {
      uiConfig: {
        deepLinking: false
      },
      routePrefix: "/docs"
    });
  
    await app
      .listen({ port: 3000 , host: '0.0.0.0' }, )
      .then((address) => {
        app.swagger();
        console.log(
          `Server started on ${address}\nSwagger UI: http://localhost:3000/docs`
        );
      })
      .catch((e) => {
        throw e;
      });
  }
  
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
  