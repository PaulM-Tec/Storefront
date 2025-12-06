
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products";
import cartRouter from "./routes/cart";
import { ZodError } from "zod";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: "http://localhost:5173", credentials: true, exposedHeaders: ["x-cart-id"] }));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/products", productsRouter);
  app.use("/cart", cartRouter);

  // Error handler
  app.use((err: any, _req: any, res: any, _next: any) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "ValidationError", issues: err.issues });
    }
    if (err && err.code && typeof err.code === 'string') {
      return res.status(400).json({ error: err.code, message: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "ServerError", message: "Unexpected error" });
  });

  return app;
}
