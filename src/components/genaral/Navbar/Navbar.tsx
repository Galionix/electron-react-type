import React from 'react';
// import './Navbar.scss';
import styled from 'styled-components';
import * as themes from './../theme/Schema.json';
import { setToLS } from './../../../utils/Lstorage';


const left_buttons: { class: string, func(): void }[] =
[{
  class: 'fal fa-phone',
func: ()=>{


}
},{
  class: 'fal fa-comment-alt-dots',
func: ()=>{


}
},{
  class: 'fal fa-cog',
  func: ()=>{

  alert('You pressed settings');

}
}];

const right_buttons: { class: string, func(): void }[] =
[{class: 'fal fa-window-minimize',
func: ()=>{


}
},
{
  class: 'fal fa-window-close',
  func: ()=>{

}
}];

 const Switch = (classes:string,func:()=>void) => {

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
    background-color: yellow;
  }
    `;

  return (
<Li>
    <Switch className={classes} onClick={func}/>
</Li>


  );
};

export default function Navbar () {
const Nav = styled.div`
display: flex;
flex-direction: row;
height: min-content;

`;
  const NavLeft = styled.ul`
width: 50%;
height: min-content;
background-color: white;
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
background-color: white;
display:flex;
flex-ditrection: row;
justify-content: flex-end;

&${Nav}:hover i{

-webkit-app-region: none;

  border: 1px solid gray;
}
-webkit-app-region: drag;
  `;




  return (
<Nav>
    <NavLeft>
{
left_buttons.map(button=>Switch(button.class,button.func))
}
    </NavLeft>
    <NavRight>
{
right_buttons.map(button=>Switch(button.class,button.func))
}
    </NavRight>
    </Nav>
  );
}
