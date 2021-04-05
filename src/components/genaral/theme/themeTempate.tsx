import React, { useState, useEffect, ComponentClass } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {useTheme} from './useTheme';
import { getFromLS } from '../../../utils/Lstorage';

const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;
    cursor: pointer;
`;

const Wrapper = styled.li`
    padding: 48px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #000;
    list-style: none;
    max-width: 6rem;
    margin: 1rem;
`;

const Container = styled.ul`
    display: flex;
    // gap: 1rem;
    // grid-template-columns: repeat(2, 1fr);
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 3rem;
    padding: 10px;
`;

const Header = styled.h2`
    display: flex;
    justify-content: space-around;
`;

export default (props:any) => {
    const themesFromStore = getFromLS('all-themes');
    const [data, setData] = useState(themesFromStore.data);
    const [themes, setThemes] = useState<string[]>([]);
    const {setMode} = useTheme();

    const themeSwitcher = (selectedTheme:any) => {
        console.log(selectedTheme);
        setMode(selectedTheme);
        props.setter(selectedTheme);
    };

    useEffect(() => {

      // console.log('%c ☠️: _.keys(data) ',
      // 'font-size:16px;background-color:#29654f;color:white;',
      // _.keys(data));

      setThemes(_.keys(data));

    }, [data]);

    useEffect(() => {
        props.newTheme &&
            updateThemeCard(props.newTheme);
    }, [props.newTheme]);

    const updateThemeCard = (theme:any) => {
        const key = _.keys(theme)[0];
        const updated = {...data, [key]:theme[key]};
        setData(updated);
    };

    const ThemeCard = (props:any) => {
        return(
            <Wrapper style={{backgroundColor: `${data[_.camelCase(props.theme.name)].colors.body}`,
                    color: `${data[_.camelCase(props.theme.name)].colors.text}`,
                    fontFamily: `${data[_.camelCase(props.theme.name)].font}`}}>
                    <span>Click on the button to set this theme</span>
                <ThemedButton onClick={ (theme) => {themeSwitcher( props.theme);}}
                    style={{backgroundColor: `${data[_.camelCase(props.theme.name)].colors.button.background}`,
                    color: `${data[_.camelCase(props.theme.name)].colors.button.text}`,
                    fontFamily: `${data[_.camelCase(props.theme.name)].font}`}}>
                    {props.theme.name}
                </ThemedButton>
            </Wrapper>
        );
    };

    return (
        <div>
            <Header>Select a Theme from below</Header>
            <Container>
            {
                themes.length > 0 &&
                    themes.map(theme =>(
                        <ThemeCard theme={data[theme]} key={data[theme].id} />
                    ))
            }
            </Container>
        </div>
    );
};
