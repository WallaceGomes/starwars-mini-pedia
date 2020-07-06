import React, { useState, useEffect } from 'react';
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

	useEffect(() => {
		// sendRequest('').then((response) => {
		// 	setUsers(response.data);
		// });
	}, []);

	return (
		<>
			<Header>
				<Logo />
				<Button>Logout</Button>
			</Header>
			<Container>
				<Header>
					<h1>Manage Users</h1>
					<Button>New User</Button>
				</Header>
				{isLoading && LoadingSpinner}
				<Description>
					<span>ID</span>
					<span>Name</span>
					<span>Email</span>
					<span>Created at</span>
					<span>Edited at</span>
				</Description>
				{
					users && (
						users.map((user) => {
							return (
								<ListItens key={user.userId}>
									<span>{user.userId}</span>
									<span>{user.name}</span>
									<span>{user.email}</span>
									<span> {user.created_at} </span>
									<span> {user.edited_at || 'N/A'}</span>
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
