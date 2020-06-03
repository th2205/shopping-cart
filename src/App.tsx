import React from 'react';
import styled from 'styled-components';
import Router from './routes';

function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: rgb(249, 249, 249);
`;
