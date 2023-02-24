const request = require("supertest");
const db_service = require("../../../utils/db/service");
const sample_output = [{}];

// test case for the /mobile api
describe("Test case for the /mobile api", () => {
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
    const body = {
      mobile: "9191919191",
      mode: "customer",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/mobile").send(body);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    const body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/mobile").send(body);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile not found in paylaod
  it("Should return 422, if mobile not found in payload", async () => {
    const body = {
      mode: "customer",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/mobile").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mode not found in paylaod
  it("Should return 422, if mode not found in payload", async () => {
    const body = {
      mobile: "9191919191",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/mobile").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile is invalid in paylaod
  it("Should return 422, if mobile is invalid in payload", async () => {
    const body = {
      mobile: "9191911",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/mobile").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mode is invalid in paylaod
  it("Should return 422, if mode is invalid in payload", async () => {
    const body = {
      mode: "AAA",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/mobile").send(body);
    expect(response._body.code).toBe(422);
  });
});
