import React from "react";
import styled from "styled-components";
import Game from "./game";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <AppContainer>
      <Game />
    </AppContainer>
  );
};

export default App;
