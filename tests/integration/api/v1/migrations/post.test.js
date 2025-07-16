import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP schema public CASCADE; CREATE schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const firstResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    }
  );

  expect(firstResponse.status).toBe(201);
  
  const firstResponseBody =
  await firstResponse.json();
  
  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(firstResponseBody.length).toBeGreaterThan(0);
  
  const secondResponseBody = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    }
  );
  
  expect(secondResponseBody.status).toBe(200);

  const secondResponseBodyBody = await secondResponseBody.json();

  expect(Array.isArray(secondResponseBodyBody)).toBe(true);
  expect(secondResponseBodyBody.length).toEqual(0);
});
