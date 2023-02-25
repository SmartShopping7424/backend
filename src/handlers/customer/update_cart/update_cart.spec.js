const request = require("supertest");
const db_service = require("../../../utils/db/service");
const token = "test";
const sample_output = [{}];

// test case for the /customer/cart post api
describe("Test case for the /customer/cart post api", () => {
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
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile not found in paylaod
  it("Should return 422, if mobile not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    delete body["mobile"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_barcode not found in paylaod
  it("Should return 422, if product_barcode not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    delete body["product_barcode"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_quantity not found in paylaod
  it("Should return 422, if product_quantity not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    delete body["product_quantity"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mode not found in paylaod
  it("Should return 422, if mode not found in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    delete body["mode"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile is invalid in paylaod
  it("Should return 422, if mobile is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "remove",
    };
    body["mobile"] = "919191";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_barcode is invalid in paylaod
  it("Should return 422, if product_barcode is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "remove",
    };
    body["product_barcode"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_quantity is invalid in paylaod
  it("Should return 422, if product_quantity is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "update",
    };
    body["product_quantity"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mode is invalid in paylaod
  it("Should return 422, if mode is invalid in payload", async () => {
    var body = {
      mobile: "9191919191",
      shop_id: "AAA",
      product_barcode: "PSG676",
      product_quantity: 5,
      mode: "remove",
    };
    body["mode"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/cart")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
