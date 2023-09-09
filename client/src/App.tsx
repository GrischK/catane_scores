import React from 'react';
import HomePage from "./screens/HomePage/HomePage";
import {Route, Routes, useLocation} from "react-router-dom";
import GamesList from "./screens/PlayersList/GamesList";
import PlayersList from "./screens/GamesList/PlayersList";

function App() {
    const location = useLocation();

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/players_list" element={<PlayersList/>}/>
                <Route path="/games_list" element={<GamesList/>}/>
            </Routes>

        </>
);
}

export default App;
