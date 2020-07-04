const UserController = require("../../controllers/user-controller");
const UserModel = require("../../models/user");
const newUser = require("../mock-data/new-user.json");
const userLoginmock = require("../mock-data/user-login.json");
const updateUser = require("../mock-data/update-mock.json")
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
	beforeEach(async () => {
		req.body = newUser;
		await UserController.signup(req, res, next);
	});

	it("should have a signup function", () => {
		expect(typeof UserController.signup).toBe("function");
	});
	it("should call User.findOne", async () => {
		const { email } = req.body;
		expect(UserModel.findOne).toHaveBeenCalledWith({ email: email });
	});
	it("should call bcrypt.hash", async () => {
		const { password } = req.body;
		expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
	});
	it("should call jwt.sign", async () => {
		expect(jwt.sign).toHaveBeenCalled();
	});

	it("should return 201 respoonse code", async () => {
		expect(res.statusCode).toBe(201);
		expect(res._isEndCalled()).toBeTruthy();
	});
});

describe("UserController login method", () => {
	beforeEach(() => {
		req.body = userLoginmock;
	});

	it("should have a login function", () => {
		expect(typeof UserController.login).toBe("function");
	});

	it("should call User.findOne", async () => {
		await UserController.login(req, res, next);
		const { email } = req.body;
		expect(UserModel.findOne).toHaveBeenCalledWith({ email: email });
	});
	it("should return 201 respoonse code", async () => {
		UserModel.findOne.mockReturnValue(userLoginmock.email);
		bcrypt.compare.mockReturnValue(true);
		const response = await UserController.login(req, res, next);
		expect(response.statusCode).toBe(201);
		expect(response._isEndCalled()).toBeTruthy();
	});
});

describe("UserController getUser method", () => {
	it("should call User.find", async () => {
		await UserController.index(req, res, next);
		expect(UserModel.find).toHaveBeenCalled();
	});
});

describe("UserController userDelete method", () => {
	beforeEach(async () => {
		const userId = '5f00c4b01ffe2c3358b7d04d';
		req.params.userId = userId;
		await UserController.delete(req, res, next);
	});
	it("should call User.findById", async () => {
		expect(UserModel.findById).toHaveBeenCalledWith({ _id: req.params.userId });
	});
});

describe("UserController update method", () => {
	beforeEach(async () => {
		const userId = '5f00c4b01ffe2c3358b7d04d';
		req.body = updateUser;
		req.params.userId = userId;
		UserController.update(req, res, next);
	});
	it("should call User.findOneAndUpdate", async () => {
		expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: req.params.userId }, updateUser);
	});
})
