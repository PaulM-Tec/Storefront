import request from "supertest";
import { createApp } from "../src/app";
 
const app = createApp();
 
describe("Cart endpoints", () => {
  it("creates a cart on GET /cart and returns empty items", async () => {
    const res = await request(app).get("/cart");
    expect(res.status).toBe(200);
    expect(res.headers["x-cart-id"]).toBeDefined();
    expect(res.body).toEqual(
      expect.objectContaining({
        items: expect.any(Array),
        subtotal: 0,
      })
    );
  });
 
  it("POST /cart adds an item and returns subtotal", async () => {
    // First, get a cart id
    const g = await request(app).get("/cart");
    const cartId = g.headers["x-cart-id"] as string;
 
    const add = await request(app)
      .post("/cart")
      .set("x-cart-id", cartId)
      .send({ productId: "p-001", quantity: 2 });
 
    expect(add.status).toBe(201);
    expect(add.headers["x-cart-id"]).toBe(cartId);
    expect(add.body.items.length).toBeGreaterThan(0);
    // subtotal should be > 0
    expect(add.body.subtotal).toBeGreaterThan(0);
  });
 
  it("PATCH /cart replaces quantities", async () => {
    // Create cart and add two items
    const g = await request(app).get("/cart");
    const cartId = g.headers["x-cart-id"] as string;
 
    await request(app).post("/cart").set("x-cart-id", cartId).send({ productId: "p-001", quantity: 1 });
    await request(app).post("/cart").set("x-cart-id", cartId).send({ productId: "p-002", quantity: 3 });
 
    const patch = await request(app)
      .patch("/cart")
      .set("x-cart-id", cartId)
      .send({ items: [{ productId: "p-001", quantity: 0 }, { productId: "p-002", quantity: 1 }] });
 
    expect(patch.status).toBe(200);
    expect(patch.body.items.find((i: any) => i.productId === "p-001")).toBeUndefined();
    expect(patch.body.items.find((i: any) => i.productId === "p-002")?.quantity).toBe(1);
  });
});