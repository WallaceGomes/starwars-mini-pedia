import React, { useState, useContext } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../util/AuthContext';
import LoadingSpinner from '../../components/LoadingSpiner';

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
			<form onSubmit={authSubmitHandler} className="auth-form">
				<Input
					type="email"
					name="userEmail"
					placeholder="Email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
				/>
				{!isLoginMode && (
					<>
						<Input
							type="text"
							name="userName"
							placeholder="Name"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</>
				)}
				<Input
					type="password"
					name="userPass"
					placeholder="Password"
					value={userPassword}
					onChange={(e) => setUserPassword(e.target.value)}
				/>
				<Button type="submit">{isLoginMode ? 'Login' : 'Register'}</Button>
			</form>
			<div className="switch-mode">
				<small>Don't have a registration yet?</small>
				<Button onClick={switchModeHandler}>
					Change to {isLoginMode ? 'Register' : 'Login'}
				</Button>
			</div>
		</>
	);
};

export default Login;
