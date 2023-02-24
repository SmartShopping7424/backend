const request = require("supertest");
const db_service = require("../../../utils/db/service");
const server = require("../../../../app");
const token = "test";
const sample_output = [{}];

// test case for the /customer/location post api
describe("Test case for the /customer/location post api", () => {
  // close the server
  afterAll((done) => {
    server.close();
    done();
  });

  // code 200, if all input valid
  it("Should return 200, if payload is valid", async () => {
    var body = {
      latitude: "23.8787",
      longitude: "77.8787",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/location")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    var body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/location")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(400);
  });

  // code 422, if latitude not found in paylaod
  it("Should return 422, if latitude not found in payload", async () => {
    var body = {
      latitude: "23.8787",
      longitude: "77.8787",
    };
    delete body["latitude"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/location")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if longitude not found in paylaod
  it("Should return 422, if longitude not found in payload", async () => {
    var body = {
      latitude: "23.8787",
      longitude: "77.8787",
    };
    delete body["longitude"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/location")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if latitude is invalid in paylaod
  it("Should return 422, if latitude not found in payload", async () => {
    var body = {
      latitude: "AAA",
      longitude: "77.8787",
    };
    delete body["latitude"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/location")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });

  // code 422, if longitude is invalid in paylaod
  it("Should return 422, if longitude not found in payload", async () => {
    var body = {
      latitude: "23.8787",
      longitude: "AAA",
    };
    delete body["longitude"];
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server)
      .post("/customer/location")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(response._body.code).toBe(422);
  });
});
