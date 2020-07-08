import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';
import { validate, VALIDATOR_MINLENGTH } from '../../util/validators';
import { useHistory } from 'react-router-dom';

import { Container, Validate } from './styles';

const ResetPass = () => {

	const [userPassword, setUserPassword] = useState('');
	const { sendRequest, isLoading } = useHttpClient();
	const history = useHistory();

	//isso aqui está horrivel e dá pra melhorar, é temporário...
	const isPasswordValid = validate(userPassword, [VALIDATOR_MINLENGTH(6)]);

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
			if (response.message === "Your password has been changed!") {
				alert(response.message);
				history.push("/login");
			}
		} catch (err) {
			console.log(err);
		}

	}

	return (
		<>
			{isLoading && <LoadingSpinner asOverLay />}
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
