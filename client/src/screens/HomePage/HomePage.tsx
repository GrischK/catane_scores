import React from "react";
import CatanLogo from "../../assets/images/catan-logo.png";
import styles from './HomePage.module.css';
import {NavLink} from "react-router-dom";


export default function HomePage() {
    return (
        <div className={styles.home_page_container}>
            <img src={CatanLogo} alt="Catan Logo"/>
            <button className={styles.new_game_button}>Nouvelle partie</button>
            <button className={styles.ranking_button}>Classement</button>
            <NavLink to="/games_list">
                <button className={styles.ranking_button}>Liste des parties</button>
            </NavLink>
            <NavLink to="/players_list">
                <button className={styles.ranking_button}>Liste des joueurs</button>
            </NavLink>
        </div>
    )
}
