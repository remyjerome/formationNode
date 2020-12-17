const request = require("supertest");

const app = require("./app");

describe("app.js", () => {
  describe("/", () => {
    it("GET should return Hello world", async () => {
      const response = await request(app).get("/");

      expect(response.text).toContain("Hello world");
    });
  });

  describe("/coucou", () => {
    it("GET should return Orange!", async () => {
      const response = await request(app).get("/coucou");

      console.log(Object.keys(response));

      expect(response.text).toContain("Orange!");
      expect(response.statusCode).toBe(200);
    });
  });
});
