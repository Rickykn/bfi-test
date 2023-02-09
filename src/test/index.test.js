const request = require("supertest");

const app = require("../index");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6ImdhbGFuZyIsImlhdCI6MTY3NTkxNjYwOCwiZXhwIjoxNjc1OTUyNjA4fQ.NxPaq3UlmB55he9E4J6dXSlVoaUNKIcL8Ko25bpG_JE";

const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6ImdhbGFuZyIsImlhdCI6MTY3NTkxNjYwOCwhwIjoxNjc1OTUyNjA4fQ.NxPaq3UlmB55he9E4J6dXSlVoaUNKIcL8Ko25bpG_JE";

const payloadLogin = {
  credential: "galang",
  password: "Password12",
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
      .delete(`/books/` + 5)
      .set({ Authorization: token })
      .expect(200);
  });

  // it("return delete product success", async () => {
  //   const res = await request(app)
  //     .delete(`/books/` + 5)
  //     .set({ Authorization: token })
  //     .expect(200);
  // });

  it("return edit book ", async () => {
    const res = await request(app)
      .patch("/books/" + 6)
      .send(payloadEditBook)
      .set({ Authorization: token })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);
  });
});
