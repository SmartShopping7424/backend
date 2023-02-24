const request = require("supertest");
const db_service = require("../../../utils/db/service");
const token = "test";
const sample_output = [{ id: 1, product_name: "AAA" }];

// test case for the /customer/scan post api
describe("Test case for the /customer/scan post api", () => {
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
      shop_id: "AAA",
      product_barcode: "ODT090",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/scan")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/scan")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      shop_id: "AAA",
      product_barcode: "ODT090",
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/scan")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_barcode not found in paylaod
  it("Should return 422, if product_barcode not found in payload", async () => {
    var body = {
      shop_id: "AAA",
      product_barcode: "ODT090",
    };
    delete body["product_barcode"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/scan")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      shop_id: "AAA",
      product_barcode: "ODT090",
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/scan")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_barcode is invalid in paylaod
  it("Should return 422, if product_barcode is invalid in payload", async () => {
    var body = {
      shop_id: "AAA",
      product_barcode: "ODT090",
    };
    body["product_barcode"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/scan")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
