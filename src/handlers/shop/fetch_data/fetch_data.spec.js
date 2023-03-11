const request = require("supertest");
const db_service = require("../../../utils/db/service");
const token = "test";
const sample_output = [{ id: 1, shop_name: "Test", shop_mobile: "9999999999" }];

// test case for the /shop get api
describe("Test case for the /shop get api", () => {
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
  it("Should return 200, if query parameter is valid", async () => {
    var query_parameter = {
      mobile: "9999999999",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .get("/shop")
      .query(query_parameter)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no query parameter found
  it("Should return 400, if query parameter is not found", async () => {
    var query_parameter = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .get("/shop")
      .query(query_parameter)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile is invalid
  it("Should return 422, if mobile is invalid", async () => {
    var query_parameter = {
      mobile: "99999999",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .get("/shop")
      .query(query_parameter)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile not found
  it("Should return 422, if mobile not found", async () => {
    var query_parameter = {
      mobile: "9999999999",
      other_data: "",
    };
    delete query_parameter["mobile"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .get("/shop")
      .query(query_parameter)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
