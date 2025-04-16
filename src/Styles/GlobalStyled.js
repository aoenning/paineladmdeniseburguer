import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  
  *, *::before, *::after{
    content: '';
    content: none;
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    outline: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }

  body { overflow-x: hidden; outline: none;}
  html, body, #root {
    
    max-height: 100vh;
    max-width: 100vw;
    width: 100%;
    height: 100%;    
  }
  body {
    font-family: 'Roboto', 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased !important;
    /* letter-spacing: -0.300px; */
    /* font-weight: 500; */
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;
