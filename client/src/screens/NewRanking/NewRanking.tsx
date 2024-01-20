import styles from './NewRanding.module.css';
import React, {useEffect, useState} from "react";
import MysteriousText from "../../components/MysteriousText";
import ConfettiExplosion from 'react-confetti-explosion';
import cheer from '../../assets/sounds/cheer.mp3'
import trumpets from '../../assets/sounds/fanfare_trumpets.mp3'
import {useGamesQuery, User} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";

interface PlayersPoints {
    player: User;
    playerTotalPoints: number;
}

export default function NewRanking() {
    const [thirdPlayerIsShown, setThirdPlayerIsShown] = useState(false)
    const [moveThirdPlayer, setMoveThirdPlayer] = useState(false)
    const [thirdPlayerNameIsShown, setThirdPlayerNameIsShown] = useState(false)

    const [secondPlayerIsShown, setSecondPlayerIsShown] = useState(false)
    const [moveSecondPlayer, setMoveSecondPlayer] = useState(false)
    const [secondPlayerNameIsShown, setSecondPlayerNameIsShown] = useState(false)

    const [firstPlayerIsShown, setFirstPlayerIsShown] = useState(false)
    const [moveFirstPlayer, setMoveFirstPlayer] = useState(false)
    const [firstPlayerNameIsShown, setFirstPlayerNameIsShown] = useState(false)

    const [darkBackground, setDarkBackground] = useState(false)
    const [spotLight, setSpotLight] = useState(false);

    const [isExploding, setIsExploding] = useState(false);

    const cheersSound = new Audio(cheer);
    const trumpetsSound = new Audio(trumpets);

    const {data, refetch} = useGamesQuery()
    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])

    useEffect(() => {
        if (data) {
            const updatedPlayersPoints: PlayersPoints[] = [];
            data.games.forEach((game) => {
                if (game.scores && game.scores.length > 0) {
                    const sortedScores = [...game.scores];
                    sortedScores.sort((a, b) => b.score - a.score);
                    const firstPlayer = sortedScores[0].player;

                    const playerIndex = updatedPlayersPoints.findIndex(
                        (p) => p.player?.name === firstPlayer.name
                    );

                    if (playerIndex !== -1) {
                        updatedPlayersPoints[playerIndex].playerTotalPoints += 1;
                    } else {
                        updatedPlayersPoints.push({
                            player: firstPlayer,
                            playerTotalPoints: 1,
                        });
                    }
                }
            });
            updatedPlayersPoints.sort((a, b) => b.playerTotalPoints - a.playerTotalPoints);

            setPlayersPoints(updatedPlayersPoints);
        }
    }, [data]);

    useEffect(() => {
        const timers: any[] = [];

        const thirdPlayerTimer = setTimeout(() => {
            setThirdPlayerIsShown(true)
        }, 1000);
        const thirdPlayerNameTimer = setTimeout(() => {
            setThirdPlayerNameIsShown(true)
        }, 3000);
        const moveThirdPlayerTimer = setTimeout(() => {
            setMoveThirdPlayer(true)
        }, 5000);

        timers.push(thirdPlayerTimer, moveThirdPlayerTimer, thirdPlayerNameTimer);

        const secondPlayerTimer = setTimeout(() => {
            setSecondPlayerIsShown(true)
        }, 5000);
        const secondPlayerNameTimer = setTimeout(() => {
            setSecondPlayerNameIsShown(true)
        }, 7000);
        const moveSecondPlayerTimer = setTimeout(() => {
            setMoveSecondPlayer(true)
        }, 9000);

        const firstPlayerTimer = setTimeout(() => {
            setFirstPlayerIsShown(true)
        }, 9000);
        const firstPlayerNameTimer = setTimeout(() => {
            setFirstPlayerNameIsShown(true)
        }, 11000);
        const moveFirstPlayerTimer = setTimeout(() => {
            setMoveFirstPlayer(true)
        }, 13000);
        timers.push(firstPlayerTimer, moveFirstPlayerTimer, firstPlayerNameTimer);

        const darkBackground = setTimeout(() => {
            setDarkBackground(true)
        }, 10000);
        const light = setTimeout(() => {
            setSpotLight(true);
        }, 13000);
        const removeDarkBackground = setTimeout(() => {
            setDarkBackground(false);
        }, 14000);
        timers.push(secondPlayerTimer, moveSecondPlayerTimer, secondPlayerNameTimer, light);

        const confettiTimer = setTimeout(() => {
            setIsExploding(true);
        }, 11000);

        const cheersPlay = setTimeout(() => {
            trumpetsSound.play();
            cheersSound.play();
        }, 10700)

        timers.push(cheersPlay, confettiTimer);

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            setSpotLight(false)
        }
    }, []);

    return (
        <div className={styles.newRanking_container}>
            {isExploding &&
                <ConfettiExplosion
                    className={`confetti`}
                    height={"100vh"}
                    width={2000}
                />}
            <div
                className={`${styles.thirdPlayer} ${thirdPlayerIsShown ? styles.appear : ''} ${moveThirdPlayer ? styles.move : ''}`}>
                <span>3</span>
                <div className={`${styles.playerName} ${thirdPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                    Mymy
                </div>
            </div>
            <div
                className={`${styles.secondPlayer} ${secondPlayerIsShown ? styles.appear : ''} ${moveSecondPlayer ? styles.move : ''}`}>
                <span>2</span>
                <div className={`${styles.playerName} ${secondPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                    Leila
                </div>
            </div>
            <div
                className={`${styles.firstPlayer} ${firstPlayerIsShown ? styles.appear : ''} ${moveFirstPlayer ? styles.move : ''}`}>
                <span>1</span>
                <div className={`${styles.playerName} ${firstPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                    {playersPoints.length > 0 && (
                        <div className={styles.player_info}>
                            {playersPoints[0].player.picture ?
                                <img src={playersPoints[0].player?.picture}
                                     alt={`avatar de ${playersPoints[0].player.name}`}/>
                                :
                                <img src={defaultAvatar} alt="user picture"/>
                            }
                            <h1>{playersPoints[0].player?.name}</h1>
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles.lightCircleOff} ${darkBackground ? styles.lightCircleOn : ''}`}>
            </div>
        </div>
    )
}