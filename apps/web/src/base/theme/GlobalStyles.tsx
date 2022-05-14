import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.font};
    font-size: 1.8rem;
  }

  a,button{
    text-decoration: none;
    font-family: inherit;
  }

  @media only screen and (max-width: 850px) {
    html {
      font-size: 56.25%;
    }
  }
  @media only screen and (max-width: 600px) {
    html {
      font-size: 50%;
    }
  }

  :target {
    animation: background-fade 10s forwards;
    -webkit-animation: background-fade 3s forwards; /* Safari 4+ */
    -moz-animation:    background-fade 3s forwards; /* Fx 5+ */
    -o-animation:      background-fade 3s forwards; /* Opera 12+ */
    animation:         background-fade 3s forwards;
  }

  body::-webkit-scrollbar {
    width: 1.2rem;
    padding: 1px;
    background-color: rgba(25, 27, 35, 0.5);
  }

  body::-webkit-scrollbar-thumb {
    width: 1rem;
    background-color: ${({ theme }) => theme.colors.dark};
  }

  body {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.6rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  h1 {
    font-size: 4.8rem;
  }

  h2 {
    font-size: 3.8rem;
  }

  h3 {
    font-size: 2.8rem;
  }

  h4 {
    font-size: 2.2rem;
  }

  h5 {
    font-size: 1.8rem;
  }

  h6 {
    font-size: 1.6rem;
  }

  div, p, span, input, a, button {
    font-size: inherit;
    font-weight: 300;
  }

  .container {
    max-width: 100rem;
    width: 80%;
    margin: 4rem auto;
  }

  .page-title {
    font-size: 2.6rem;
  }
`;
