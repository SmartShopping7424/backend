const request = require("supertest");
const db_service = require("../../../../utils/db/service");
const token = "test";
const sample_output = [{}];

// test case for the /shop/employee/add_product post api
describe("Test case for the /shop/employee/add_product post api", () => {
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
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if employee_id not found in paylaod
  it("Should return 422, if employee_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["employee_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id not found in paylaod
  it("Should return 422, if shop_id not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["shop_id"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_barcode not found in paylaod
  it("Should return 422, if product_barcode not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_barcode"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_name not found in paylaod
  it("Should return 422, if product_name not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_name"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_name not found in paylaod
  it("Should return 422, if product_name not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_name"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_category not found in paylaod
  it("Should return 422, if product_category not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_category"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_sub_category not found in paylaod
  it("Should return 422, if product_sub_category not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_sub_category"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_mrp not found in paylaod
  it("Should return 422, if product_mrp not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_mrp"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_selling_price not found in paylaod
  it("Should return 422, if product_selling_price not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_selling_price"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_image not found in paylaod
  it("Should return 422, if product_image not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_image"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_offer not found in paylaod
  it("Should return 422, if product_offer not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_offer"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_offer_type not found in paylaod
  it("Should return 422, if product_offer_type not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_offer_type"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_discount not found in paylaod
  it("Should return 422, if product_discount not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_discount"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_pack_count not found in paylaod
  it("Should return 422, if product_pack_count not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_pack_count"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_pack_price not found in paylaod
  it("Should return 422, if product_pack_price not found in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    delete body["product_pack_price"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if employee_id is invalid in paylaod
  it("Should return 422, if employee_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["employee_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if shop_id is invalid in paylaod
  it("Should return 422, if shop_id is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["shop_id"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_barcode is invalid in paylaod
  it("Should return 422, if product_barcode is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_barcode"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_name is invalid in paylaod
  it("Should return 422, if product_name is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_name"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_category is invalid in paylaod
  it("Should return 422, if product_category is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_category"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_sub_category is invalid in paylaod
  it("Should return 422, if product_sub_category is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_sub_category"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_mrp is invalid in paylaod
  it("Should return 422, if product_mrp is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_mrp"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_selling_price is invalid in paylaod
  it("Should return 422, if product_selling_price is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_selling_price"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_image is invalid in paylaod
  it("Should return 422, if product_image is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_image"] = "aa";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_offer is invalid in paylaod
  it("Should return 422, if product_offer is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_offer"] = "";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_offer_type is invalid in paylaod
  it("Should return 422, if product_offer_type is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_offer_type"] = "aa";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_discount is invalid in paylaod
  it("Should return 422, if product_discount is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_discount"] = "aa";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_pack_count is invalid in paylaod
  it("Should return 422, if product_pack_count is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_pack_count"] = "aa";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if product_pack_price is invalid in paylaod
  it("Should return 422, if product_pack_price is invalid in payload", async () => {
    var body = {
      employee_id: "AAA",
      shop_id: "BBB",
      product_barcode: "FDER456",
      product_name: "Test Product",
      product_category: "Test Category",
      product_sub_category: "Test Sub Category",
      product_mrp: 400.0,
      product_selling_price: 380.0,
      product_image: "https://www.google.com",
      product_offer: 0,
      product_offer_type: "",
      product_discount: "",
      product_pack_count: "",
      product_pack_price: "",
    };
    body["product_pack_price"] = "aa";
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/shop/employee/add_product")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
