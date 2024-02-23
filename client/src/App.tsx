import React, {useState} from 'react';
import HomePage from "./screens/HomePage/HomePage";
import {Route, Routes, useLocation} from "react-router-dom";
import GamesList from "./screens/GamesList/GamesList";
import PlayersList from "./screens/PlayersList/PlayersList";
import NewGame from "./screens/NewGame/NewGame";
import NavBar from "./components/NavBar/NavBar";
import NewRanking from "./screens/RankingPage/RankingPage";
import Test from "./screens/Test/Test";
import {AnimatePresence} from "framer-motion";

function App() {
    const location = useLocation();

    const [gamesListRefreshed, setGamesListRefreshed] = useState(false);
    const [rankingRefreshed, setRankingRefreshed] = useState(false);

    // Function to refresh games list
    const refreshGamesList = () => {
        setGamesListRefreshed(!gamesListRefreshed);
    };

    // Function to refresh ranking
    const refreshRanking = () => {
        setRankingRefreshed(!rankingRefreshed);
    };

    return (
        <>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route
                        path="/new_game"
                        element={
                            <NavBar buttonColor={'#f04d4d'}>
                                <NewGame refreshGamesList={refreshGamesList} refreshRanking={refreshRanking}/>
                            </NavBar>}
                    />
                    <Route path="/games_list"
                           element={
                               <NavBar buttonColor={'#2dc40f'}>
                                   <GamesList gamesListRefreshed={gamesListRefreshed}/>
                               </NavBar>}
                    />
                    <Route path="/players_list"
                           element={
                               <NavBar buttonColor={'#ffd903'}>
                                   <PlayersList/>
                               </NavBar>}
                    />
                    <Route path="/ranking"
                           element={
                               <NavBar buttonColor={'#5ba1fc'}>
                                   <NewRanking rankingRefreshed={rankingRefreshed}/>
                               </NavBar>}
                    />
                    <Route path="/test"
                           element={
                               <NavBar buttonColor={'#5ba1fc'}>
                                   <Test/>
                               </NavBar>}
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
