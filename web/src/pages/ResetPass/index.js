import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';
import { validate, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import { Container, Validate } from './styles';

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

const ResetPass = () => {

	const [userPassword, setUserPassword] = useState('');
	const { sendRequest, isLoading } = useHttpClient();
	const history = useHistory();

	//isso aqui está horrivel e dá pra melhorar, é temporário...
	const isPasswordValid = validate(userPassword, [VALIDATOR_MINLENGTH(6)]);

	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalText, setModalText] = useState('');

	function switchModalState() {
		setIsOpen((prevMode) => !prevMode);
		if (modalIsOpen) {
			history.push("/login");
		}
	}

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		//gambiarra pra pegar o token
		//dá pra fazer com o withRouter, mas não entendi
		const url = window.location.href;
		const token = url.slice(-229);
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/reset/${token}`,
				'PATCH',
				JSON.stringify({
					newPassword: userPassword,
				}),
				{
					'Content-Type': 'application/json',
				},
			);
			console.log(response);
			setModalText(response.message);
			switchModalState();
		} catch (err) {
			console.log(err);
			setModalText(err.message);
			switchModalState();
		}

	}

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
					<Button type="submit">Reset Password</Button>
				</form>
			</Container>
		</>
	)
}

export default ResetPass;
