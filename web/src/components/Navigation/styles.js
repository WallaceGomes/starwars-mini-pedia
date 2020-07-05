import styled from 'styled-components';

export const StyledNav = styled.ul`
	height: 50px;
	position: relative;
	justify-content: center;
	align-items: center;
	padding-top: 10px;
	margin-top: 5rem;
	display: flex;
	list-style: none;
	button{
		margin-left: 20px;
		margin-right: 20px;
		background: #262626;
		color: #fff;
		padding: 10px 20px;
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
