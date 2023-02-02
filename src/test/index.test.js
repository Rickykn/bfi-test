const request = require("supertest");

const app = require("../index");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InJpY2t5eWtuIiwiaWF0IjoxNjc1MzM1MDMxLCJleHAiOjE2NzUzNzEwMzF9.aEudbkR1cND3gVRAXCd2r0YnXbcsgGk9hrhMmEJRJRA";

const token2 =
  "eyJhbGciOiJzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InJpY2t5eWtuIiwiaWF0IjoxNjc1MzM1MDMxLCJleHAiOjE2NzUzNzEwMzF9.aEudbkR1cND3gVRAXCd2r0YnXbcsgGk9hrhMmEJRJRA";

const payloadLogin = {
  credential: "rickykurniawan350@gmail.com",
  password: "Password1",
};

const payloadEditBook = {
  description: "zoro menjadi penghianat",
  quantity: 1,
};

describe("register", () => {
  it("return get one user", async () => {
    const res = await request(app).get("/users").set({ Authorization: token });
    expect(res.statusCode).toEqual(200);
  });

  it("return register login success", async () => {
    const res = await request(app)
      .post("/users/login")
      .send(payloadLogin)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
  });

  it("return delete user", async () => {
    const res = await request(app)
      .delete(`/users/` + 4)
      .expect(200);
  });
});

describe("product", () => {
  it("return get all product", async () => {
    const res = await request(app).get("/books").set({ Authorization: token });
    expect(res.statusCode).toEqual(200);
  });
  it("return 401 unauthorize ", async () => {
    const res = await request(app).get("/books").set({ Authorization: token2 });
    expect(res.statusCode).toEqual(401);
  });
  it("return delete product success", async () => {
    const res = await request(app)
      .delete(`/books/` + 2)
      .set({ Authorization: token })
      .expect(200);
  });

  it("return delete product success", async () => {
    const res = await request(app)
      .delete(`/books/` + 2)
      .set({ Authorization: token })
      .expect(200);
  });

  it("return edit book ", async () => {
    const res = await request(app)
      .patch("/books/" + 7)
      .send(payloadEditBook)
      .set({ Authorization: token })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
  });
});
