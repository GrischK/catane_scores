import React from "react";
import CatanLogo from "../../assets/images/catan-logo.png";
import styles from './HomePage.module.css';
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import MysteriousText from "../../components/MysteriousText";


export default function HomePage() {
    return (
        <div className={styles.home_page_container}>
            <MysteriousText>Les Cataneurs Fous</MysteriousText>
            <div className={styles.button_container}>
                <NavLink to="/new_game">
                    <ColoredButton bgColor={'red'}>Nouvelle partie</ColoredButton>
                </NavLink>
                <NavLink to="/ranking">
                    <ColoredButton bgColor={'blue'}>Classement</ColoredButton>
                </NavLink>
                <NavLink to="/games_list">
                    <ColoredButton bgColor={'green'}>Parties</ColoredButton>
                </NavLink>
                <NavLink to="/players_list">
                    <ColoredButton bgColor={'yellow'}>Cataneurs</ColoredButton>
                </NavLink>
            </div>
        </div>
    )
}
