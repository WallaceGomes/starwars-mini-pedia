import React, { useState, useEffect } from 'react';

import Button from '../../components/Button/index';
import Header from '../../components/Header/index';
import Logo from '../../components/Logo/index';
import { StyledNav } from './styles';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/LoadingSpiner';
import Wraper from '../../components/Wraper/index';
import Card from '../../components/Card';

import { AuthContext } from './../../util/AuthContext';

function Home() {

	const [peoples, setPeoples] = useState([]);
	const [starships, setStarships] = useState([]);
	const [planets, setPlanets] = useState([]);

	const [pages, setPages] = useState(null);
	const [currentResource, setCurrentResource] = useState('people');
	const [nextPage, setNextPage] = useState('');
	const [previousPage, setPreviousPage] = useState('');

	const { sendRequest, isLoading } = useHttpClient();

	const perviousPageHandler = async () => {
		if (previousPage === null) {
			return;
		}

		try {
			switch (currentResource) {
				case 'starships':
					requestStarshipsHandler(previousPage);
					break;
				case 'planets':
					requestPlanetsHandler(previousPage);
					break;
				default:
					requestPeoplesHandler(previousPage);
			}
		} catch (err) {
		}
	}

	const nextPageHandler = async () => {
		if (nextPage === null) {
			return;
		}

		try {
			switch (currentResource) {
				case 'starships':
					requestStarshipsHandler(nextPage);
					break;
				case 'planets':
					requestPlanetsHandler(nextPage);
					break;
				default:
					requestPeoplesHandler(nextPage);
			}
		} catch (err) {
			console.log(err);
		}
	}


	const requestStarshipsHandler = async (link) => {
		try {
			const response = await sendRequest(link || 'https://swapi.dev/api/starships/');
			setStarships(response.results);
			setPages(Math.round(response.count / 10))
			setCurrentResource('starships');
			setNextPage(response.next);
			setPreviousPage(response.previous);
		} catch (err) {
			console.log(err);
		}
	}

	const requestPeoplesHandler = async (link) => {

		try {
			const response = await sendRequest(link || 'https://swapi.dev/api/people/');
			setPeoples(response.results);
			setPages(Math.ceil(response.count / 10))
			setCurrentResource('people');
			setNextPage(response.next);
			setPreviousPage(response.previous);
		} catch (err) {
			console.log(err);
		}

	}
	const requestPlanetsHandler = async (link) => {

		try {
			const response = await sendRequest(link || 'https://swapi.dev/api/planets/');
			setPlanets(response.results);
			setPages(Math.round(response.count / 10))
			setCurrentResource('planets');
			setNextPage(response.next);
			setPreviousPage(response.previous);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		sendRequest('https://swapi.dev/api/people/').then((response) => {
			setPeoples(response.results);
			setPages(Math.ceil(response.count / 10));
			setNextPage(response.next);
			setPreviousPage(response.previous);
		});
	}, []);

	return (
		<>
			<Header>
				<Logo />
				<Button>Login</Button>
			</Header>
			<StyledNav>
				<li><button onClick={() => requestPeoplesHandler('https://swapi.dev/api/people/')} >Peoples</button></li>
				<li><button onClick={() => requestStarshipsHandler('https://swapi.dev/api/starships/')} >Starships</button></li>
				<li><button onClick={() => requestPlanetsHandler('https://swapi.dev/api/planets/')} >Planets</button></li>
			</StyledNav>
			<StyledNav>
				<li><button onClick={perviousPageHandler} >Previous Page</button></li>
				<li><button onClick={nextPageHandler} >Next Page</button></li>
			</StyledNav>
			<Wraper>
				{isLoading &&
					<LoadingSpinner />
				}
				{
					currentResource === 'people' && (
						peoples.map((people) => {
							return (
								<Card key={people.created}>
									<strong>Name: {people.name}</strong>
									<span>Height: {people.height}</span>
									<span>Mass: {people.mass} </span>
									<span>Hair color: {people.hair_color} </span>
									<span>Skin color: {people.skin_color} </span>
									<span>Eye color: {people.eye_color} </span>
									<span>Birth: {people.birth_year} </span>
									<span>Gender: {people.gender} </span>
								</Card>
							)
						})
					)
				}
				{
					currentResource === 'planets' && (
						planets.map((planet) => {
							return (
								<Card key={planet.created}>
									<strong>Name: {planet.name}</strong>
									<span>Rotation: {planet.rotation_period}</span>
									<span>Orbit: {planet.orbital_period} </span>
									<span>Diameter: {planet.diameter} </span>
									<span>Climate: {planet.climate} </span>
									<span>Gravity: {planet.gravity} </span>
									<span>Terrain: {planet.terrain} </span>
									<span>Surface Water: {planet.surface_water} </span>
									<span>Population: {planet.population} </span>
								</Card>
							)
						})
					)
				}
				{
					currentResource === 'starships' && (
						starships.map((startship) => {
							return (
								<Card key={startship.created}>
									<strong>Name: {startship.name}</strong>
									<span>Model: {startship.model}</span>
									<span>Manufacturer: {startship.manufacturer} </span>
									<span>Cost(credits): {startship.cost_in_credits} </span>
									<span>Length: {startship.length} </span>
									<span>Max speed: {startship.max_atmosphering_speed} </span>
									<span>Cargo: {startship.cargo_capacity} </span>
									<span>Class: {startship.starship_class} </span>
								</Card>
							)
						})
					)
				}


			</Wraper>
		</>
	);
}

export default Home;
