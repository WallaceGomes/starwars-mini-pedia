const request = require('supertest');
const app = require('../../app');

const apiUrl = ('/api/users/');
const newUser = require('../mock-data/new-user.json');
const userLogin = require('../mock-data/user-login.json');


let createdUserId;

describe("Integration test for userController signup method", () => {
	it("Should post a newUser to apiUrl", async () => {
		const response = await request(app).post(apiUrl + 'signup').send(newUser);
		expect(response.statusCode).toBe(201);
		expect(response.body.email).toBe(newUser.email);
		createdUserId = response.body.userId;
	});
});

describe("Integration test for userController login method", () => {
	it("Should get a user login to apiUrl", async () => {
		const response = await request(app).get(apiUrl + 'login').send(userLogin);
		expect(response.statusCode).toBe(201);
		expect(response.body.email).toBe(userLogin.email);
	});
});

describe("Integration test for usercontroller delete method :userId", () => {
	it("Should delete a user from the DB using apiUrl", async () => {
		const response = await request(app).delete(apiUrl + createdUserId).send();
		expect(response.statusCode).toBe(200);
		expect(response.body).toStrictEqual({
			message: 'User deleted!'
		});

	});
});
