import './App.css';
import Card from './Card';
import styled from 'styled-components';


const NavContainer = styled.div`
  height: 70px;
  display: flex;
  padding: 20px 36px;
  box-shadow: 0px 10px 10px rgb(var(--color-dark));
  color: rgb(var(--color-bright));
  font-size:50px;
`;

function App() {
  return (
    <>
      <NavContainer className='nav'>Github Search</NavContainer>
      <div className='search'>
        <Card />
      </div>
    </>
  );
}

export default App;
