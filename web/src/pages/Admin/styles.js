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
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

export const ListItens = styled.section`
	background: rgba(217, 217, 217, 0.4);
	max-width: 100%;
	padding: 10px;
	margin-top: 5px;
	margin-bottom: 5px;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;
