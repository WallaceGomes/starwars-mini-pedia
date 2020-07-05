import React from 'react';

import Button from '../components/Button/index';
import Header from '../components/Header/index';
import Logo from '../components/Logo/index';

function Home() {
	return (
		<Header>
			<Logo />
			<Button>Login</Button>
		</Header>
	);
}

export default Home;
