import styled from "styled-components";

const H1 = styled.h1`
  color: red;
`;

const Button = styled.button`
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
`;

function App() {
  return (
    <StyledApp>
      <h1>lets make the wild oasis</h1>
      <H1>Hello world</H1>
      <Button onClick={() => alert("check in")}>Check in</Button>
      <Button onClick={() => alert("check out")}>Check out</Button>
      <button>with out css</button>
    </StyledApp>
  );
}

export default App;
