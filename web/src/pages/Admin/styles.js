import styled from 'styled-components';

export const Container = styled.section`
	background: rgba(115, 115, 115, 0.4);
	width: 90%vh;
	max-width: 100%;
	height: 700px;
	border-radius: 20px;
	margin: 20px;
	margin-top: 100px;
	padding: 20px;
	Header{
		position: relative;
		h1{
			color: #fff;
		}
	}
`;

export const Description = styled.section`
	background: rgba(217, 217, 217, 0.4);
	max-width: 100%;
	padding: 10px;
	margin-top: 5px;
	margin-bottom: 5px;

	display: grid;
	grid-gap: 40px;
	grid-template-columns: 1fr 2fr 2fr 0.5fr 0.5fr;
	span{
		justify-items: start;
	}
`;

export const ListItens = styled.section`
	background: rgba(217, 217, 217, 0.4);
	max-width: 100%;
	padding: 10px;
	margin-top: 5px;
	margin-bottom: 5px;

	display: grid;
	grid-gap: 50px;
	grid-template-columns: 10% 2fr 2fr 0.5fr 0.5fr;
	span{
		justify-items: start;

		svg{
			&:hover{
			cursor: pointer;
		}
		}
	}
`;

export const FormContainer = styled.div`
	background: #262626;
	width: 320px;
	margin: 180px auto;
	padding: 10px;
	border-radius: 5px;

		button img{
			width: 100px;
			margin-left: 90px;
		}

		h1{
			color: #fff;
			margin-bottom: 10px;
			margin-left: 110px;
		}
		form label{
			justify-content: space-evenly;
		}
		form Button {
			width: 220px;
			margin-left: 40px;
			font-size: 16px;
		}
`;

export const Validate = styled.small`
color: #ff3333;
margin-left: 50px;
`;


