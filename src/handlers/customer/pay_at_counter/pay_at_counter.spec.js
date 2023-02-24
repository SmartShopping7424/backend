const request = require("supertest");
const db_service = require("../../../utils/db/service");
const token = "test";
const sample_output = [{}];

// test case for the /customer/pay_at_counter post api
describe("Test case for the /customer/pay_at_counter post api", () => {
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
      shop_id: "AAA",
      amount: 120.0,
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile not found in paylaod
  it("Should return 422, if mobile not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      amount: 120.0,
    };
    delete body["mobile"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      amount: 120.0,
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if amount not found in paylaod
  it("Should return 422, if amount not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      amount: 120.0,
    };
    delete body["amount"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile is invalid in paylaod
  it("Should return 422, if mobile is invalid in payload", async () => {
    var body = {
      mobile: "91919191",
      shop_id: "AAA",
      amount: 120.0,
    };
    body["mobile"] = "919191";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      amount: 120.0,
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if orders is invalid in paylaod
  it("Should return 422, if orders is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      amount: 120.0,
    };
    body["amount"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/pay_at_counter")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
