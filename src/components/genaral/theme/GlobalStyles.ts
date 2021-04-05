import { createGlobalStyle} from 'styled-components';



interface MyTheme
  {

theme?:{

  colors: {
    body?: string,
    text?: string,
    button: {
      text?: string,
      background?: string
    },
    link: {
      text?: string,
      opacity?: number
    }
  },
  font?: string
};


  }




export const GlobalStyles:any = createGlobalStyle`
  body {

    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
  }
  body>div>div{
    --webkit-app-region: drag;

  }
  a {

    cursor: pointer;
  }

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: #1064EA;
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.font};
  }

  button.btn {

  }
`;
