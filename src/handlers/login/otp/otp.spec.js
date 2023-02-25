const request = require("supertest");
const db_service = require("../../../utils/db/service");
const sample_output = [{ otp: "1234" }];

// test case for the /otp api
describe("Test case for the /otp api", () => {
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
      otp: "1234",
      mode: "customer",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(200);
  });

  // code 400, if no paylaod found
  it("Should return 400, if payload not found", async () => {
    const body = {};
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(400);
  });

  // code 422, if mobile not found in paylaod
  it("Should return 422, if mobile not found in payload", async () => {
    const body = {
      otp: "1234",
      mode: "customer",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if otp not found in paylaod
  it("Should return 422, if otp not found in payload", async () => {
    const body = {
      mobile: "9191919191",
      mode: "shop",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mode not found in paylaod
  it("Should return 422, if mode not found in payload", async () => {
    const body = {
      mobile: "9191919191",
      otp: "1234",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mobile is invalid in paylaod
  it("Should return 422, if mobile is invalid in payload", async () => {
    const body = {
      mobile: "9191911",
      otp: "1234",
      mode: "shop",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if otp is invalid in paylaod
  it("Should return 422, if otp is invalid in payload", async () => {
    const body = {
      mobile: "9191919191",
      otp: "",
      mode: "shop",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(422);
  });

  // code 422, if mode is invalid in paylaod
  it("Should return 422, if mode is invalid in payload", async () => {
    const body = {
      mobile: "9191919191",
      otp: "1234",
      mode: "AAA",
    };
    jest.spyOn(db_service, "excute_statement").mockResolvedValue(sample_output);
    const response = await request(server).post("/otp").send(body);
    expect(response._body.code).toBe(422);
  });
});
