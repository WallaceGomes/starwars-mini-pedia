import styled from 'styled-components';

export const Container = styled.section`
width: 90%vh;
max-width: 100%;
border: 1px solid #cccc00;
height: 700px;
border-radius: 20px;
margin: 20px;
display: grid;
grid-template-columns: repeat(5, 1fr);
transition: ease all .6s;

@media(max-width: 1180px){
	grid-template-columns: repeat(4, 1fr);
	height: 1000px;
}
@media(max-width: 950px){
	grid-template-columns: repeat(3, 1fr);
	height: 1300px;
}
@media(max-width: 800px){
	grid-template-columns: repeat(2, 1fr);
	height: 1600px;
}
@media(max-width: 490px){
	grid-template-columns: repeat(1, 1fr);
	height: 3100px;
}
`;
