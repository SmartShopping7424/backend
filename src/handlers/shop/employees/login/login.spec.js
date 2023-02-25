const request = require("supertest");
const db_service = require("../../../../utils/db/service");
const token = "test";
const sample_output = [{ type: 0, password: "abc123" }];

// test case for the /shop/employee/login post api
describe("Test case for the /shop/employee/login post api", () => {
  let server;

  // loading the server
  beforeEach(() => {
    server = require("../../../../../app");
  });

  // closing the server
  afterEach(async () => {
    await server.close();
  });

  // code 200, if all input valid
  it("Should return 200, if payload is valid", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if employee_id not found in paylaod
  it("Should return 422, if employee_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    delete body["employee_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if password not found in paylaod
  it("Should return 422, if password not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    delete body["password"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if type not found in paylaod
  it("Should return 422, if type not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    delete body["type"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if employee_id is invalid in paylaod
  it("Should return 422, if employee_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    body["employee_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if password is invalid in paylaod
  it("Should return 422, if password is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    body["password"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if type is invalid in paylaod
  it("Should return 422, if type is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      password: "abc123",
      type: 0,
    };
    body["type"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/login")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
