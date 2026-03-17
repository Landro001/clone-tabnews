import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const firstResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(firstResponse.status).toBe(201);

        const firstResponseBody = await firstResponse.json();

        expect(Array.isArray(firstResponseBody)).toBe(true);
        expect(firstResponseBody.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const secondResponseBody = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(secondResponseBody.status).toBe(200);

        const secondResponseBodyBody = await secondResponseBody.json();

        expect(Array.isArray(secondResponseBodyBody)).toBe(true);
        expect(secondResponseBodyBody.length).toEqual(0);
      });
    });
  });
});
