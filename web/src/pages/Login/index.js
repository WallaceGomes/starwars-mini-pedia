import React, { useState, useContext } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../util/AuthContext';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';
import { validate, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';

import { Container, SwitchMode, Validate } from './styles';

//TODO : Validation

const Login = () => {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userName, setUserName] = useState('');

	const [isLoginMode, setIsLoginMode] = useState(true);
	const { sendRequest, isLoading } = useHttpClient();

	const auth = useContext(AuthContext);

	//isso aqui está horrivel e dá pra melhorar, é temporário...
	const isEmailValid = validate(userEmail, [VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]);
	const isPasswordValid = validate(userPassword, [VALIDATOR_MINLENGTH(6)]);
	const isUserNameValid = validate(userName, [VALIDATOR_REQUIRE()])

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isLoginMode) {
			try {
				const reponse = await sendRequest(
					'http://localhost:5000/api/users/login',
					'POST',
					JSON.stringify({
						email: userEmail,
						password: userPassword,
					}),
					{
						'Content-Type': 'application/json',
					},
				);
				auth.login(reponse.userId, reponse.token);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const response = await sendRequest(
					'http://localhost:5000/api/users/signup',
					'POST',
					JSON.stringify({
						email: userEmail,
						password: userPassword,
						name: userName,
					}),
					{
						'Content-Type': 'application/json',
					},
				);
				auth.login(response.userId, response.token);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const switchModeHandler = () => {
		setIsLoginMode((prevMode) => !prevMode);
	};

	//loading spinner
	return (
		<>
			{isLoading && <LoadingSpinner asOverLay />}
			<Container>
				<Logo></Logo>
				<form onSubmit={authSubmitHandler}>
					{!isEmailValid && (
						<Validate>Please enter a valid email address</Validate>
					)}
					<Input
						type="email"
						name="userEmail"
						placeholder="Email"
						value={userEmail}
						setValue={setUserEmail}
					/>
					{!isLoginMode && (
						<>
							{!isUserNameValid && (
								<Validate>Please enter your name</Validate>
							)}
							<Input
								type="text"
								name="userName"
								placeholder="Name"
								value={userName}
								setValue={setUserName}
							/>
						</>
					)}
					{!isPasswordValid && (
						<Validate>Password min 6 chars</Validate>
					)}
					<Input
						type="password"
						name="userPass"
						placeholder="Password"
						value={userPassword}
						setValue={setUserPassword}
					/>
					<Button type="submit">{isLoginMode ? 'Login' : 'Register'}</Button>
				</form>
				<SwitchMode>
					<small>{isLoginMode ? `Don't have an account?` : 'Already have an account?'}</small>
					<Button onClick={switchModeHandler}>
						{isLoginMode ? 'Signup' : 'Login'}
					</Button>
				</SwitchMode>
			</Container>
		</>
	);
};

export default Login;
