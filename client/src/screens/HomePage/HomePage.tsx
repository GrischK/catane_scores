import React from "react";
import CatanLogo from "../../assets/images/catan-logo.png";
import styles from './HomePage.module.css';
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";


export default function HomePage() {
    return (
        <div className={styles.home_page_container}>
            <img src={CatanLogo} alt="Catan Logo"/>
            <NavLink to="/new_game">
                <Button variant="contained">
                    Nouvelle partie
                </Button>
            </NavLink>
            <Button variant="contained">
                Classement
            </Button>
            <NavLink to="/games_list">
                <Button variant="contained">
                    Liste des parties
                </Button>
            </NavLink>
            <NavLink to="/players_list">
                <Button variant="contained">
                    Liste des cataneurs
                </Button>
            </NavLink>
        </div>
    )
}
