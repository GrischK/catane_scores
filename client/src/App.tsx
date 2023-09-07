import React from 'react';
import HomePage from "./screens/HomePage/HomePage";
import {Route, Routes, useLocation} from "react-router-dom";
import PlayersList from "./screens/PlayersList/PlayersList";

function App() {
    const location = useLocation();

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/players_list" element={<PlayersList/>}/>
            </Routes>

        </>
);
}

export default App;
