import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.scss';
import styled from 'styled-components';
// import * as themes from './../theme/Schema.json';
// import { setToLS } from './../../../utils/Lstorage';


const left_buttons: { class: string, func(): void,route: string }[] =
[{
  class: 'fal fa-phone',
func: ()=>{


},route :''
},{
  class: 'fal fa-comment-alt-dots',
func: ()=>{


},route :''
},{
  class: 'fal fa-cog',
  func: ()=>{

  // alert('You pressed settings');

},route :'/settings/'
}];

const right_buttons: { class: string, func(): void,route: string }[] =
[{class: 'fal fa-window-minimize',
func: ()=>{


},route :''
}
,
{
  class: 'fal fa-window-close',
  func: ()=>{

},route :''
}
];


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
export default function Navbar (props:MyTheme) {

console.log("%c 🌞: Navbar -> props ",
"font-size:16px;background-color:#66ad54;color:white;",
props)



const Nav = styled.div`
display: flex;
flex-direction: row;
height: min-content;

`;
const NavLeft = styled.ul`
width: 50%;
height: min-content;
// background-color: ${props.theme?.colors.body};
display:flex;
flex-ditrection: row;
padding-top: 1px;


&${Nav}:hover i{
-webkit-app-region: none;

  border: 1px solid gray;
}
-webkit-app-region: drag;
  `;
const NavRight = styled.ul`
  padding-top: 1px;
width: 50%;
height: min-content;
// background-color: ${props.theme?.colors.body};
display:flex;
flex-ditrection: row;
justify-content: flex-end;

&${Nav}:hover i{

-webkit-app-region: none;

  border: 1px solid gray;
}
-webkit-app-region: drag;
  `;


  const Switch = (classes:string,func:()=>void,route:string,props:MyTheme) => {


  console.log("%c 🏌️‍♂️: Switch -> props ",
  "font-size:16px;background-color:#e23405;color:white;",
  props)

    const Li=styled.li`
  padding:.2rem;
    `;
    const Switch = styled.i`
    padding: .2rem;
    border-radius: .3rem;
    // background-color: red;
    border: 1px solid black;
    color: black;
    -webkit-app-region: none;
    &:hover {
      cursor: pointer;
      background-color: ${props.style.button.background};
    }
      `;

    return (
      <Link to={route}>
  <Li>
      <Switch className={classes} onClick={func}/>
  </Li>
      </Link>


    );
  };



  return (

<Nav>
    <NavLeft>
{

left_buttons.map(button=>Switch(button.class,button.func,button.route,props))

}
    </NavLeft>
    <NavRight>
{

right_buttons.map(button=>Switch(button.class,button.func,button.route,props))


}
    </NavRight>
    </Nav>
  );
}
