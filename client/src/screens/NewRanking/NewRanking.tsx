import styles from './NewRanding.module.css';
import React, {useEffect, useRef, useState} from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import cheer from '../../assets/sounds/cheer.mp3'
import trumpets from '../../assets/sounds/fanfare_trumpets.mp3'
import tadaa from '../../assets/sounds/tadaa.mp3'
import {useGamesQuery, User} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import thirdMedal from "../../assets/images/medal_3.png"
import secondMedal from "../../assets/images/medal_2.png"
import cup from "../../assets/images/cup.png"
import Ranking from "../Ranking/Ranking"

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

    const [mutedSounds, setMutedSounds] = useState(false);

    const cheersSoundRef = useRef(new Audio(cheer));
    const trumpetsSoundRef = useRef(new Audio(trumpets));
    const tadaaSound1Ref = useRef(new Audio(tadaa));
    const tadaaSound2Ref = useRef(new Audio(tadaa));
    const tadaaSound3Ref = useRef(new Audio(tadaa));
    tadaaSound1Ref.current.volume = 0.4
    tadaaSound2Ref.current.volume = 0.5
    tadaaSound3Ref.current.volume = 0.6

    const {data, refetch} = useGamesQuery()
    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])

    const [step, setStep] = useState(1)

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
        if (step === 2) {
            const timers: any[] = [];

            const thirdPlayerTimer = setTimeout(() => {
                setThirdPlayerIsShown(true)
                tadaaSound1Ref.current.play();
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
                // tadaaSound1Ref.current.currentTime = 0;
                tadaaSound2Ref.current.play();
            }, 5000);
            const secondPlayerNameTimer = setTimeout(() => {
                setSecondPlayerNameIsShown(true)
            }, 7000);
            const moveSecondPlayerTimer = setTimeout(() => {
                setMoveSecondPlayer(true)
            }, 9000);

            const firstPlayerTimer = setTimeout(() => {
                setFirstPlayerIsShown(true)
                // tadaaSound2Ref.current.currentTime = 0;
                tadaaSound3Ref.current.play();
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

            }, 10500);
            const removeDarkBackground = setTimeout(() => {
                setDarkBackground(false);
            }, 14000);
            timers.push(secondPlayerTimer, moveSecondPlayerTimer, secondPlayerNameTimer, light, removeDarkBackground, darkBackground);

            const confettiTimer = setTimeout(() => {
                setIsExploding(true);
            }, 11000);

            const cheersPlay = setTimeout(() => {
                trumpetsSoundRef.current.play();
                cheersSoundRef.current.play();
            }, 10700)

            timers.push(cheersPlay, confettiTimer);

            return () => {
                timers.forEach(timer => clearTimeout(timer));
                setSpotLight(false)
            }
        }
    }, [step]);

    const muteSounds = () => {
        if(mutedSounds){
            tadaaSound1Ref.current.muted = false;
            tadaaSound2Ref.current.muted = false;
            tadaaSound3Ref.current.muted = false;
            cheersSoundRef.current.muted = false;
            trumpetsSoundRef.current.muted = false;
            setMutedSounds(false)
        }else{
            tadaaSound1Ref.current.muted = true;
            tadaaSound2Ref.current.muted = true;
            tadaaSound3Ref.current.muted = true;
            cheersSoundRef.current.muted = true;
            trumpetsSoundRef.current.muted = true;
            setMutedSounds(true)
        }
    }

    return (
        <div>
            {step === 1 && (
                <div>
                    <Ranking/>
                    <button style={{marginTop: "100px"}} onClick={() => setStep(prevState => prevState + 1)}>Podium
                    </button>
                </div>)
            }
            {step === 2 && (
                <div className={styles.newRanking_container}>
                    <button onClick={muteSounds} style={{marginTop:'100px'}}>Mute</button>
                    {isExploding &&
                        <ConfettiExplosion
                            className={`confetti`}
                            height={"100vh"}
                            width={2000}
                        />}
                    <div
                        className={`${styles.thirdPlayer} ${thirdPlayerIsShown ? styles.appear : ''} ${moveThirdPlayer ? styles.move : ''}`}>
                        <img src={thirdMedal} alt={"medal of third best player"} className={styles.podiumMedal}/>
                        {playersPoints.length > 0 &&
                            <h1 className={`${styles.playerNameTitle} ${thirdPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}>{playersPoints[2].player?.name}</h1>
                        }
                        <div
                            className={`${styles.playerName} ${thirdPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                            {playersPoints.length > 0 && (
                                <div className={styles.player_info}>
                                    {playersPoints[2].player.picture ?
                                        <img src={playersPoints[2].player?.picture}
                                             alt={`avatar de ${playersPoints[2].player.name}`}/>
                                        :
                                        <img src={defaultAvatar} alt="user picture"/>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${styles.secondPlayer} ${secondPlayerIsShown ? styles.appear : ''} ${moveSecondPlayer ? styles.move : ''}`}>
                        <img src={secondMedal} alt={"medal of second best player"} className={styles.podiumMedal}/>
                        {playersPoints.length > 0 &&
                            <h1 className={`${styles.playerNameTitle} ${secondPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}>{playersPoints[1].player?.name}</h1>
                        }
                        <div
                            className={`${styles.playerName} ${secondPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                            {playersPoints.length > 0 && (
                                <div className={styles.player_info}>
                                    {playersPoints[1].player.picture ?
                                        <img src={playersPoints[1].player?.picture}
                                             alt={`avatar de ${playersPoints[1].player.name}`}/>
                                        :
                                        <img src={defaultAvatar} alt="user picture"/>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${styles.firstPlayer} ${firstPlayerIsShown ? styles.appear : ''} ${moveFirstPlayer ? styles.move : ''} `}>
                        <img src={cup} alt={"cup of the Catan king"} className={styles.podiumMedal}/>
                        {playersPoints.length > 0 &&
                            <h1 className={`${styles.playerNameTitle} ${firstPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}>{playersPoints[0].player?.name}</h1>
                        }
                        <div
                            className={`${styles.playerName} ${firstPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                            {playersPoints.length > 0 && (
                                <div className={styles.player_info}>
                                    {playersPoints[0].player.picture ?
                                        <img src={playersPoints[0].player?.picture}
                                             alt={`avatar de ${playersPoints[0].player.name}`}/>
                                        :
                                        <img src={defaultAvatar} alt="user picture"/>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                    {spotLight ? (
                        <div
                            className={`${styles.lightCircleOff} ${darkBackground ? styles.lightCircleOn : ''} ${moveFirstPlayer ? styles.move : ""}`}>
                        </div>) : null
                    }

                </div>
            )}
        </div>
    )
}