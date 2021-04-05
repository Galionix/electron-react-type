import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';

import Navbar from './Navbar/Navbar';
// import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';
import WebFont from 'webfontloader';


import './App.scss';
import { setToLS } from '../../utils/Lstorage';
import * as themes from '../genaral/theme/Schema.json';
// import * as themes from '../colorSchema.json';


const Container = styled.div`
  margin: 5px auto 5px auto;
`;

const AppContainer = () => {

  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);


     // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });


  return (
    <>
    {
      themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
        <Container style={{fontFamily: selectedTheme.font}}>
          <h1>Theme Builder</h1>
          <p>
            This is a theming system with a Theme Switcher and Theme Builder.
            Do you want to see the source code? <a href='https://github.com/atapas/theme-builder' target='_blank'>Click here.</a>
          </p>
        </Container>
      </ThemeProvider>
    }
    </>
    // <div>
    //   <Navbar />
    // </div>
  );
};

export default function App () {

  setToLS('all-themes', themes.default);
  return (
    <Router>
      <Switch>
        <Route path='/' component={AppContainer} />
      </Switch>
    </Router>
  );
}
