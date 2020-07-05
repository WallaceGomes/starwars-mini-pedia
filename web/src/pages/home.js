import React, { useState, useEffect } from 'react';

import Button from '../components/Button/index';
import Header from '../components/Header/index';
import Logo from '../components/Logo/index';
import { StyledNav } from './styles';
import { useHttpClient } from './../hooks/http-hook';
import LoadingSpinner from '../components/LoadingSpiner';
import Wraper from '../components/Wraper/index';

function Home() {

	const [peoples, setPeoples] = useState([]);
	const [starships, setStarships] = useState([]);
	const [planets, setPlanets] = useState([]);

	const [pages, setPages] = useState(null);

	const [isLoginMode, setIsLoginMode] = useState(true);
	const { sendRequest, isLoading } = useHttpClient();

	const requestStarshipsHandler = async () => {

		try {
			const response = await sendRequest('https://swapi.dev/api/people/');
			console.log(response);
		} catch (err) {
		}
	}

	useEffect(() => {

	}, [])

	return (
		<>
			<Header>
				<Logo />
				<Button >Login</Button>
			</Header>
			<StyledNav>
				<li><button onClick={requestStarshipsHandler} >Peoples</button></li>
				<li><button>Starships</button></li>
				<li><button>Planets</button></li>
			</StyledNav>
			<Wraper>
				{isLoading &&
					<section>
						<LoadingSpinner />
					</section>
				}
			</Wraper>
		</>
	);
}

export default Home;
