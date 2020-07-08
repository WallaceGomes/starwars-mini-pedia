import React, { useState, useEffect, useContext } from 'react';

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';
import { Container, Description, ListItens, Validate, FormContainer } from './styles';
import { validate, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../util/validators';

import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from './../../util/AuthContext';

const Admin = () => {

	const auth = useContext(AuthContext);
	const { sendRequest, isLoading } = useHttpClient();

	const [users, setUsers] = useState([]);

	const [editUserName, setEditUserName] = useState('');
	const [editUserEmail, setEditUserEmail] = useState('');
	const [editUserId, setEditUserID] = useState(Number);
	const [newUserEmail, setNewUserEmail] = useState('');
	const [newUserName, setNewUserName] = useState('');
	const [newUserPassword, setNewUserPassword] = useState('');

	const [isEditMode, setIsEditMode] = useState(false);
	const [isNewUserMode, setIsNewUserMode] = useState(false);

	//isso aqui está horrivel e dá pra melhorar, é temporário...
	const isNewUserEmailValid = validate(newUserEmail, [VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]);
	const isNewUserPasswordValid = validate(newUserPassword, [VALIDATOR_MINLENGTH(6)]);
	const isNewUserNameValid = validate(newUserName, [VALIDATOR_REQUIRE()]);

	const isEditUserNameValid = validate(editUserName, [VALIDATOR_REQUIRE()]);
	const isEditUserEmailValid = validate(editUserEmail, [VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]);

	const storedData = JSON.parse(localStorage.getItem('userData'));

	useEffect(() => {
		sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`,
			'GET',
			null,
			{
				'Authorization': `Bearer ${storedData.token}`
			}
		).then((response) => {
			setUsers(response);
		});
		return;
	}, []);

	const newUserSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
				'POST',
				JSON.stringify({
					email: newUserEmail,
					password: newUserPassword,
					name: newUserName,
				}),
				{
					'Content-Type': 'application/json',
				},
			);
			console.log(response);
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
		switchNewUserModeHandler();
	}

	const editUserSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/${editUserId}`,
				'PATCH',
				JSON.stringify({
					email: editUserEmail,
					name: editUserName,
				}),
				{
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${storedData.token}`
				}
			);
			console.log(response);
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
		switchEditModeHandler();
	}

	//falta colocar uma confirmação aqui, ... na verdade falta no aplicativo inteiro...
	const deleteUserHandler = async (userId, event) => {
		event.preventDefault();
		try {
			const response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
				'DELETE',
				null,
				{
					'Authorization': `Bearer ${storedData.token}`
				}
			);
			console.log(response);
		} catch (err) {
			console.log(err);
			alert(err.message);
		}
	}

	const switchEditModeHandler = (user) => {
		if (user) {
			setEditUserEmail(user.email);
			setEditUserName(user.name);
			setEditUserID(user._id);
		}
		setIsEditMode((prevMode) => !prevMode);
	}
	const switchNewUserModeHandler = () => {
		setIsNewUserMode((prevMode) => !prevMode);
	}

	if (isNewUserMode) {
		return (
			<>
				<Header>
					<Logo />
					<Button onClick={switchNewUserModeHandler} >Voltar</Button>
				</Header>
				{isLoading && <LoadingSpinner asOverLay />}
				<FormContainer>
					<form onSubmit={newUserSubmitHandler}>
						{!isNewUserNameValid && (
							<Validate>Please enter the name</Validate>
						)}
						<Input
							type="text"
							name="newUserName"
							placeholder="Name"
							value={newUserName}
							setValue={setNewUserName}
						/>
						{!isNewUserEmailValid && (
							<Validate>Please enter a valid email address</Validate>
						)}
						<Input
							type="email"
							name="newUserEmail"
							placeholder="Email"
							value={newUserEmail}
							setValue={setNewUserEmail}
						/>
						{!isNewUserPasswordValid && (
							<Validate>Password min 6 chars</Validate>
						)}
						<Input
							type="password"
							name="newUserPassword"
							placeholder="Password"
							value={newUserPassword}
							setValue={setNewUserPassword}
						/>
						<Button type="submit">Register</Button>
					</form>
				</FormContainer>
			</>
		);
	}
	if (isEditMode) {
		return (
			<>
				<Header>
					<Logo />
					<Button onClick={() => switchEditModeHandler()} >Voltar</Button>
				</Header>
				{isLoading && <LoadingSpinner asOverLay />}
				<FormContainer>
					<form onSubmit={editUserSubmitHandler}>
						{!isEditUserNameValid && (
							<Validate>Please the name</Validate>
						)}
						<Input
							type="text"
							name="newUserName"
							placeholder="Name"
							value={editUserName}
							setValue={setEditUserName}
						/>
						{!isEditUserEmailValid && (
							<Validate>Please enter a valid email address</Validate>
						)}
						<Input
							type="email"
							name="newUserEmail"
							placeholder="Email"
							value={editUserEmail}
							setValue={setEditUserEmail}
						/>
						<Button type="submit">Edit</Button>
					</form>
				</FormContainer>
			</>
		);
	}

	return (
		<>
			<Header>
				<Logo />
				<Button onClick={auth.logout} >Logout</Button>
			</Header>
			<Container>
				<Header>
					<h1>Manage Users</h1>
					<Button onClick={switchNewUserModeHandler}>New User</Button>
				</Header>
				{isLoading && <LoadingSpinner />}
				<Description>
					<span>Name</span>
					<span>Email</span>
					<span>ID</span>
					<span>Edit</span>
					<span>Delete</span>
				</Description>
				{
					users && (
						users.map((user) => {
							return (
								<ListItens key={user._id}>
									<span>{user.name}</span>
									<span>{user.email}</span>
									<span>{user._id}</span>
									<span><AiFillEdit onClick={() => switchEditModeHandler(user)} size={20} /></span>
									<span><AiFillDelete onClick={(event) => deleteUserHandler(user._id, event)} size={20} /></span>
								</ListItens>
							)
						})
					)
				}
			</Container>
		</>
	)
}

export default Admin;
