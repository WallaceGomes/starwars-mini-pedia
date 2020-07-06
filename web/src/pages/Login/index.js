import React, { useState, useContext } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../util/AuthContext';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';

import { Container, SwitchMode } from './styles';

//TODO : Validation

const Login = () => {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userName, setUserName] = useState('');

	const [isLoginMode, setIsLoginMode] = useState(true);
	const { sendRequest, isLoading } = useHttpClient();

	const auth = useContext(AuthContext);

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
				<Logo/>
				<form onSubmit={authSubmitHandler}>
					<Input
						type="email"
						name="userEmail"
						placeholder="Email"
						value={userEmail}
						setValue={setUserEmail}
					/>
					{!isLoginMode && (
						<>
							<Input
								type="text"
								name="userName"
								placeholder="Name"
								value={userName}
								setValue={setUserName}
							/>
						</>
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
