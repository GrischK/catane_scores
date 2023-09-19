import React, {useState} from 'react';
import HomePage from "./screens/HomePage/HomePage";
import {Route, Routes, useLocation} from "react-router-dom";
import GamesList from "./screens/GamesList/GamesList";
import PlayersList from "./screens/PlayersList/PlayersList";
import NewGame from "./screens/NewGame/NewGame";
import Ranking from "./screens/Ranking/Ranking";

function App() {
    const location = useLocation();

    const [gamesListRefreshed, setGamesListRefreshed] = useState(false);

    // Fonction de rappel pour rafraîchir la liste des jeux
    const refreshGamesList = () => {
        setGamesListRefreshed(!gamesListRefreshed);
    };

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/new_game" element={<NewGame refreshGamesList={refreshGamesList} />} />
                <Route path="/games_list" element={<GamesList gamesListRefreshed={gamesListRefreshed} />} />
                <Route path="/players_list" element={<PlayersList/>}/>
                <Route path="/ranking" element={<Ranking/>}/>
            </Routes>

        </>
);
}

export default App;
