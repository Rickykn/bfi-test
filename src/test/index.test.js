const request = require("supertest");

const app = require("../index");

describe("register", () => {
  it("return status code 201 if register is passed", async () => {
    const res = await request(app).post("/users/register").send({
      name: "ricky",
      email: "rickykurniawan350@gmail.com",
      password: "Password1",
    });
  });
});
