import React from 'react';
import './App.css';

import Button from './components/Button/index';
import Header from './components/Header/index';
import Logo from './components/Logo/index';

function App() {
	return (
		<div className="App">
			<Header>
				<Logo />
			</Header>
			<Button>Login</Button>
		</div>
	);
}

export default App;
