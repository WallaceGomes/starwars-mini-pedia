import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../util/AuthContext';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';
import { validate, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';

import { Container, SwitchMode, Validate } from './styles';

//Modal styles
const customStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.75)'
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#262626',
		color: '#fff',
		fontWeigth: 'bold'
	}
};

Modal.setAppElement('#root');

const Login = () => {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userName, setUserName] = useState('');

	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isForgotMode, setForgotMode] = useState(false);
	const { sendRequest, isLoading } = useHttpClient();

	const auth = useContext(AuthContext);

	//isso aqui está horrivel e dá pra melhorar, é temporário...
	const isEmailValid = validate(userEmail, [VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]);
	const isPasswordValid = validate(userPassword, [VALIDATOR_MINLENGTH(6)]);
	const isUserNameValid = validate(userName, [VALIDATOR_REQUIRE()])

	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalText, setModalText] = useState('Message delivered succesfully');

	function switchModalState() {
		setIsOpen((prevMode) => !prevMode);
	}

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isForgotMode) {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/forgot`,
					'POST',
					JSON.stringify({
						email: userEmail,
					}),
					{
						'Content-Type': 'application/json',
					},
				);
				setModalText(response.message);
				switchModalState();
			} catch (err) {
				console.log(err);
				setModalText('Unexpected error, please check your email and try again');
				switchModalState();
			}
			return;
		}

		if (isLoginMode) {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/login`,
					'POST',
					JSON.stringify({
						email: userEmail,
						password: userPassword,
					}),
					{
						'Content-Type': 'application/json',
					},
				);
				auth.login(response.userId, response.token);
				setModalText(response.message);
				switchModalState();
			} catch (err) {
				console.log(err);
				setModalText(err.message)
				switchModalState();
			}
		} else {
			try {
				const response = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
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
				setModalText(response.message);
				switchModalState();
			} catch (err) {
				console.log(err);
				setModalText(err.message);
				switchModalState();
			}
		}
	};

	const switchForgotModeHandler = () => {
		setForgotMode((prevMode) => !prevMode);
	}

	const switchModeHandler = () => {
		setIsLoginMode((prevMode) => !prevMode);
	};

	if (isForgotMode) {
		return (
			<>
				{isLoading && <LoadingSpinner />}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={switchModalState}
					style={customStyles}
					contentLabel="Alert Modal"
				>

					<div>{modalText}</div>
					<br />
					<br />
					<Button onClick={switchModalState}>Close</Button>
				</Modal>
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
						<Button type="submit">Send me an e-mail!</Button>
					</form>
					<SwitchMode>
						<small>I remember my password</small>
						<Button onClick={switchForgotModeHandler}>
							Login
					</Button>
					</SwitchMode>
				</Container>
			</>
		)
	}
	//loading spinner
	return (
		<>
			{isLoading && <LoadingSpinner asOverLay />}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={switchModalState}
				style={customStyles}
				contentLabel="Alert Modal"
			>

				<div>{modalText}</div>
				<br />
				<br />
				<Button onClick={switchModalState}>Close</Button>
			</Modal>
			<Container>
				<Logo></Logo>
				<form onSubmit={authSubmitHandler}>
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
				<SwitchMode>
					<small>I forgot my password</small>
					<Button onClick={switchForgotModeHandler}>
						Reset Password
					</Button>
				</SwitchMode>
			</Container>
		</>
	);
};

export default Login;
