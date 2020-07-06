import styled from 'styled-components';

export const StyledNav = styled.ul`
	height: 50px;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
	display: flex;
	list-style: none;
	button{
		margin-left: 20px;
		margin-right: 20px;
		background: #262626;
		color: #fff;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		cursor: pointer;
		border-radius: 16px;
		border: none;
		font-weight: bold;
		transition: 0.3s;

		&:hover{
			background: #fff;
			color: #000000;
		}
	}
`;
