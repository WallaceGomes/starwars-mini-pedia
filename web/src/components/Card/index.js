import React from 'react';

import { StyledCard } from './styles';

const Card = ({ children }) => {

	//aceita um estilo e da merge com os seus
	return (
		<StyledCard>
			{children}
		</StyledCard>
	);
};

export default Card;
