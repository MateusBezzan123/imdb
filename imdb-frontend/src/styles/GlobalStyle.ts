import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: ${({ theme }) => theme.fonts.primary};
    cursor: pointer;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export default GlobalStyle;
