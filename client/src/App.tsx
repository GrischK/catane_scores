import React from 'react';
import HomePage from "./screens/HomePage/HomePage";
import {Route, Routes, useLocation} from "react-router-dom";
import GamesList from "./screens/GamesList/GamesList";
import PlayersList from "./screens/PlayersList/PlayersList";
import NewGame from "./screens/NewGame/NewGame";

function App() {
    const location = useLocation();

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/new_game" element={<NewGame/>}/>
                <Route path="/games_list" element={<GamesList/>}/>
                <Route path="/players_list" element={<PlayersList/>}/>
            </Routes>

        </>
);
}

export default App;
