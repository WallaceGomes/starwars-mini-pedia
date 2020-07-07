import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpiner';
import Card from '../../components/Card';
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

		sendRequest('http://localhost:5000/api/users/',
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
					<span>ID</span>
					<span>Name</span>
					<span>Email</span>
					<span>Created at</span>
					<span>Updated at</span>
				</Description>
				{
					users && (
						users.map((user) => {
							return (
								<ListItens key={user._id}>
									<span>{user._id}</span>
									<span>{user.name}</span>
									<span>{user.email}</span>
									<span>{user.created_at}</span>
									<span>{user.updated_at || 'N/A'}</span>
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
