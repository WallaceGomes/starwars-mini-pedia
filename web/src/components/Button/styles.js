import styled from 'styled-components';

export const StyledButton = styled.button`
	height: 40px;
	width: 100px;
	background: #00001a;
	border: 1px solid #ffff33;
	color: #fff;
	font-weight: bold;
	cursor: pointer;
	text-decoration: none;
	display: inline-block;
	border-radius: 3px;
	font-size: 14px;

	&:hover{
		color: #ffff33;
		transition: 0.5s;
	}

	&:disabled,
	&:hover:disabled,
	&:active:disabled {
		background: #ccc;
		color: #979797;
		border-color: #ccc;
		cursor: not-allowed;
	}
`;
