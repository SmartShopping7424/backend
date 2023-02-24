const request = require("supertest");
const db_service = require("../../../utils/db/service");
const server = require("../../../../app");
const token = "test";
const sample_output = [{}];

// test case for the /customer/order post api
describe("Test case for the /customer/order post api", () => {
  // close the server
  afterAll((done) => {
    server.close();
    done();
  });

  // code 200, if all input valid
  it("Should return 200, if payload is valid", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile not found in paylaod
  it("Should return 422, if mobile not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    delete body["mobile"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if orders not found in paylaod
  it("Should return 422, if orders not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    delete body["orders"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if total_item not found in paylaod
  it("Should return 422, if total_item not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    delete body["total_item"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if total_mrp not found in paylaod
  it("Should return 422, if total_mrp not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    delete body["total_mrp"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if total_amount not found in paylaod
  it("Should return 422, if total_amount not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    delete body["total_amount"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile is invalid in paylaod
  it("Should return 422, if mobile is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    body["mobile"] = "919191";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if orders is invalid in paylaod
  it("Should return 422, if orders is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    body["orders"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if total_item is invalid in paylaod
  it("Should return 422, if total_item is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    body["total_item"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if total_mrp is invalid in paylaod
  it("Should return 422, if total_mrp is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    body["total_mrp"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if total_amount is invalid in paylaod
  it("Should return 422, if total_amount is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      orders: [{ product_barcode: "BBB", product_quantity: 1 }],
      total_item: 1,
      total_mrp: 120.0,
      total_amount: 100.0,
    };
    body["total_amount"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/order")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
