import React from 'react';

import { StyledNav } from './styles';

const Navigation = () => {
	return (
		<StyledNav>
			<li><button>Peoples</button></li>
			<li><button>Starships</button></li>
			<li><button>Planets</button></li>
		</StyledNav>
	);
};

export default Navigation;
