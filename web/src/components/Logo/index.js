import React from 'react';

import { MainLogo } from './styles';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

//aqui dá pra fazer a logo dinâmica
//trocar a por link depois
const Logo = () => {
	return <MainLogo><img src={logo} alt="Logo" /><Link to="/"></Link></MainLogo>;
};

export default Logo;
