const request = require("supertest");
const db_service = require("../../../../utils/db/service");
const token = "test";
const sample_output = [{ id: 1, order_id: "FDV787" }];

// test case for the /shop/employee/scan_order post api
describe("Test case for the /shop/employee/scan_order post api", () => {
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
      order_id: "FDV787",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if employee_id not found in paylaod
  it("Should return 422, if employee_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      order_id: "FDV787",
    };
    delete body["employee_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      order_id: "FDV787",
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if order_id not found in paylaod
  it("Should return 422, if order_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      order_id: "FDV787",
    };
    delete body["order_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if employee_id is invalid in paylaod
  it("Should return 422, if employee_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      order_id: "FDV787",
    };
    body["employee_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      order_id: "FDV787",
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if order_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      order_id: "FDV787",
    };
    body["order_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/scan_order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
