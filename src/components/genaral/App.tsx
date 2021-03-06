import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';

import Navbar from './Navbar/Navbar';
// import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';
import WebFont from 'webfontloader';


import './App.scss';
import { setToLS } from '../../utils/Lstorage';
import * as themes from '../genaral/theme/Schema.json';
import ThemeSelector from '../genaral/theme/themeTempate';

// import * as themes from '../colorSchema.json';


const Container = styled.div`
  margin: 5px auto 5px auto;
`;

// const AppContainer = () => {

//   const {theme, themeLoaded, getFonts} = useTheme();

//   interface MyTheme
//   {

// theme?:{

//   colors: {
//     body?: string,
//     text?: string,
//     button: {
//       text?: string,
//       background?: string
//     },
//     link: {
//       text?: string,
//       opacity?: number
//     }
//   },
//   font?: string
// };


//   }

//   const [selectedTheme, setSelectedTheme] = useState(theme);

//   useEffect(() => {
//     setSelectedTheme(theme);
//    }, [themeLoaded]);


//      // 4: Load all the fonts
//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: getFonts()
//       }
//     });
//   });


//   return (
//     <>


//     {
//       themeLoaded && <ThemeProvider theme={  selectedTheme }>
//         <GlobalStyles/>

//         <Navbar style={selectedTheme.colors}/>


//       </ThemeProvider>
//     }
//     </>
//     // <div>
//     //   <Navbar />
//     // </div>
//   );
// };




const cliplist = () => {
  return (
    <div>
      cliplist
    </div>
  );
};

const webchat = () => {
  return (
    <div>
      webchat
    </div>
  );
};

const settings = () => {

  const {theme, themeLoaded, getFonts} = useTheme();


  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  return (
    <div>
      settings
      <Container style={{fontFamily: selectedTheme.font}}>
          <h1>Theme Builder</h1>
          <p>
            This is a theming system with a Theme Switcher and Theme Builder.
            Do you want to see the source code?
            <a href='https://github.com/atapas/theme-builder' target='_blank'>Click here.</a>
          </p>

          <ThemeSelector  setter={ setSelectedTheme }/>

        </Container>
    </div>
  );
};









const AppContainer = () => {

  const {theme, themeLoaded, getFonts} = useTheme();

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

  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [location, setLocation] = useState('/');

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
      themeLoaded && <ThemeProvider theme={  selectedTheme }>
        <GlobalStyles/>
       <Router>
         <Navbar style={selectedTheme.colors} locationSet={setLocation}/>

         <Switch>
        <Route exact={true} path='/' component={cliplist} />

        <Route path='/settings/' component={settings} />

        <Route  path='/webchat/' component={webchat} />
      </Switch>


     </Router>


      </ThemeProvider>
    }
    </>

  );
};



export default function App () {

  setToLS('all-themes', themes.default);
  return <AppContainer/>
  // return (
  //   <Router>
  //     <Switch>
  //       <Route path='/' component={AppContainer} />
  //     </Switch>
  //     <Switch>
  //       <Route path='/settings/' component={Settings} />
  //     </Switch>
  //   </Router>
  // );
}
