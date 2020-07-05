import React from 'react';

import { MainLogo } from './styles';
import logo from '../../assets/logo.svg';

//aqui dá pra fazer a logo dinâmica
//trocar a por link depois
const Logo = () => {
	return <MainLogo><img src={logo} alt="Logo" /></MainLogo>;
};

export default Logo;
