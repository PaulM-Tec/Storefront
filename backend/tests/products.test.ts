import request from "supertest";
import { createApp } from "../src/app";
 
const app = createApp();
 
describe("GET /products/:id", () => {
  it("returns 404 for unknown product", async () => {
    const res = await request(app).get("/products/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "NotFound", message: "Product not found" });
  });
 
  it("returns a single product for a valid id", async () => {
    // Use an existing id from backend/src/data/products.ts, e.g. "p-001"
    const res = await request(app).get("/products/p-001");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: "p-001",
      name: expect.any(String),
      price: expect.any(Number),
    });
  });
});