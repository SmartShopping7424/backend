const request = require("supertest");
const db_service = require("../../../utils/db/service");
const token = "test";
const sample_output = [{}];

// test case for the /customer post api
describe("Test case for the /customer post api", () => {
  let server;

  // loading the server
  beforeEach(() => {
    server = require("../../../../app");
  });

  // closing the server
  afterEach(async () => {
    await server.close();
  });

  // code 200, if all input valid
  it("Should return 200, if payload is valid", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "male",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile not found in paylaod
  it("Should return 422, if mobile not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "male",
    };
    delete body["mobile"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if name not found in paylaod
  it("Should return 422, if name not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "other",
    };
    delete body["name"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if email not found in paylaod
  it("Should return 422, if email not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "male",
    };
    delete body["email"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if gender not found in paylaod
  it("Should return 422, if gender not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "other",
    };
    delete body["gender"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile is invalid in paylaod
  it("Should return 422, if mobile is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "male",
    };
    body["mobile"] = "919191";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if name is invalid in paylaod
  it("Should return 422, if name is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "female",
    };
    body["name"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if email is invalid in paylaod
  it("Should return 422, if email is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "male",
    };
    body["email"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if gender is invalid in paylaod
  it("Should return 422, if gender is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      name: "John",
      email: "abc@example.com",
      gender: "female",
    };
    body["gender"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
