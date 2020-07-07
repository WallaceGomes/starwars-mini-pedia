import React, { useState, useEffect, useContext } from 'react';

import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import Button from '../../components/Button';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpiner';
import Logo from '../../components/Logo';
import { Container, Description, ListItens } from './styles';

import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from './../../util/AuthContext';

const Admin = () => {

	const { sendRequest, isLoading } = useHttpClient();

	const [users, setUsers] = useState([]);
	const auth = useContext(AuthContext);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));

		sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`,
			'GET',
			null,
			{
				'Authorization': 'Bearer ' + `${storedData.token}`
			}
		).then((response) => {
			setUsers(response);
		});
	}, []);

	return (
		<>
			<Header>
				<Logo />
				<Button onClick={auth.logout} >Logout</Button>
			</Header>
			<Container>
				<Header>
					<h1>Manage Users</h1>
					<Button onClick={() => (console.log(users))}>New User</Button>
				</Header>
				{isLoading && LoadingSpinner}
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
									<span><AiFillEdit onClick={() => { console.log(user._id) }} size={20} /></span>
									<span><AiFillDelete onClick={() => { console.log(user._id) }} size={20} /></span>
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
