import styled from 'styled-components';

export const Container = styled.div`
	background: #262626;
	width: 320px;
	heigth: 500px;
	margin: 300px auto;
	padding: 10px;
	border-radius: 5px;
	
		a img{
			heigth: 100px;
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
	}
`;

export const SwitchMode = styled.div`
	margin: 10px;
	margin-left: 30px;
	Button {
		margin-left: 5px;
		font-weight: 400;
    height: auto;
    font-size: 12px;
	}
	small{
		color: #fff;
	}
`;
