const UserController = require("../../controllers/user-controller");
const UserModel = require("../../models/user");
const newUser = require("../mock-data/user-login.json");
const userLoginmock = require("../mock-data/user-login.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const httpMocks = require("node-mocks-http");

jest.mock("../../models/user");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

let req, res, next;

beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	next = jest.fn();
});
//falta o teste de login...
describe("UserController signUp method", () => {
	beforeEach(() => {
		req.body = newUser;
	});

	it("should have a signup function", () => {
		expect(typeof UserController.userSignup).toBe("function");
	});
	it("should call User.findOne", async () => {
		await UserController.userSignup(req, res, next);
		const { email } = req.body;
		expect(UserModel.findOne).toHaveBeenCalledWith({ email: email });
	});
	it("should call bcrypt.hash", async () => {
		await UserController.userSignup(req, res, next);
		const { password } = req.body;
		expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
	});
	it("should call jwt.sign", async () => {
		await UserController.userSignup(req, res, next);
		expect(jwt.sign).toHaveBeenCalled();
	});
	it("should return 201 respoonse code", async () => {
		await UserController.userSignup(req, res, next);
		expect(res.statusCode).toBe(201);
		expect(res._isEndCalled()).toBeTruthy();
	});
});

describe("UserController login method", () => {
	beforeEach(() => {
		req.body = userLoginmock;
	});

	it("should have a login function", () => {
		expect(typeof UserController.userLogin).toBe("function");
	});

	it("should call User.findOne", async () => {
		await UserController.userLogin(req, res, next);
		const { email } = req.body;
		expect(UserModel.findOne).toHaveBeenCalledWith({ email: email });
	});
	///??? está retornando 200 ???
	it("should return 201 respoonse code", async () => {
		UserModel.findOne.mockReturnValue(userLoginmock.email);
		bcrypt.compare.mockReturnValue(true);
		const response = await UserController.userLogin(req, res, next);
		expect(response.statusCode).toBe(201);
		expect(response._isEndCalled()).toBeTruthy();
	});
});
