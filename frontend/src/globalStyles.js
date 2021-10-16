import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --maxWidth: 1200px;
    --bs: 0px 0px 25px -7px rgba(0, 0, 0, 0.25);
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    box-sizing: inherit;
    margin: 0;
  }
  body {
    background: hsl(0, 0%, 98%);
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
    line-height: 2;
    font-family: 'Nunito Sans', sans-serif;
  }
  a {
    text-decoration: none;
  }
  button {
    font-family: 'Nunito Sans', sans-serif;
    cursor: pointer;
  }
`;

export default GlobalStyles;

export const ContainerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 3rem;
`;
