import styles from './RankingPage.module.css';
import React, {useEffect, useRef, useState} from "react";
import {useGamesQuery} from "../../gql/generated/schema";
import ConfettiExplosion from 'react-confetti-explosion';
import Ranking from "../../components/Ranking/Ranking"
import {ThemeProvider} from '@mui/material/styles';
import SparklesComponent from "../../components/SparklesComponent/SparklesComponent";
import {PlayersPoints} from "../../interfaces/playersListPage.interface";
import cheer from '../../assets/sounds/cheer.mp3'
import trumpets from '../../assets/sounds/fanfare_trumpets.mp3'
import sillyTrumpet from '../../assets/sounds/silly-trumpet.mp3'
import lessSillyTrumpet from '../../assets/sounds/less-silly-trumpet.mp3'
import moreClaps from '../../assets/sounds/moreclaps.mp3'
import soloClap from '../../assets/sounds/solo-clap.mp3'
import tadaa from '../../assets/sounds/tadaa.mp3'
import defaultAvatar from "../../assets/images/default_avatar.png";
import thirdMedal from "../../assets/images/medal_3.png"
import secondMedal from "../../assets/images/medal_2.png"
import cup from "../../assets/images/cup.png"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {IconButton} from "@mui/material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import {motion, AnimatePresence} from "framer-motion";
import {blueTheme} from "../../utils/stylesVariantes";

export default function RankingPage() {
    // Show 3rd player
    const [thirdPlayerIsShown, setThirdPlayerIsShown] = useState(false)
    const [moveThirdPlayer, setMoveThirdPlayer] = useState(false)
    const [thirdPlayerNameIsShown, setThirdPlayerNameIsShown] = useState(false)

    // Show 2nd player
    const [secondPlayerIsShown, setSecondPlayerIsShown] = useState(false)
    const [moveSecondPlayer, setMoveSecondPlayer] = useState(false)
    const [secondPlayerNameIsShown, setSecondPlayerNameIsShown] = useState(false)

    // Show 1st player
    const [firstPlayerIsShown, setFirstPlayerIsShown] = useState(false)
    const [moveFirstPlayer, setMoveFirstPlayer] = useState(false)
    const [firstPlayerNameIsShown, setFirstPlayerNameIsShown] = useState(false)

    // Manage dark background & spotlight
    const [darkBackground, setDarkBackground] = useState(false)
    const [spotLight, setSpotLight] = useState(false);

    // Confetti explosion
    const [isExploding, setIsExploding] = useState(false);

    // Manage sparkles
    const [firstIsSparkling, setFirstIsSparkling] = useState(false)
    const [secondIsSparkling, setSecondIsSparkling] = useState(false)
    const [thirdIsSparkling, setThirdIsSparkling] = useState(false)

    // Change background at podium animation end
    const [newBackground, setNewBackground] = useState(false)
    const [finalPodiumBackground, setFinalPodiumBackground] = useState(false)

    // Manage sounds
    const [mutedSounds, setMutedSounds] = useState(false);
    const cheersSoundRef = useRef(new Audio(cheer));
    const trumpetsSoundRef = useRef(new Audio(trumpets));
    const tadaaSound1Ref = useRef(new Audio(tadaa));
    const tadaaSound2Ref = useRef(new Audio(tadaa));
    const tadaaSound3Ref = useRef(new Audio(tadaa));
    const sillyTrumpetSoundRef = useRef(new Audio(sillyTrumpet))
    const soloClapSoundRef = useRef(new Audio(soloClap))
    const lessSillytTrumpetSoundRed = useRef(new Audio(lessSillyTrumpet))
    const moreClapsSoundRef = useRef(new Audio(moreClaps))

    tadaaSound1Ref.current.volume = 0.4
    tadaaSound2Ref.current.volume = 0.5
    tadaaSound3Ref.current.volume = 0.6
    sillyTrumpetSoundRef.current.volume = 0.4
    soloClapSoundRef.current.volume = 0.5
    lessSillytTrumpetSoundRed.current.volume = 0.5
    moreClapsSoundRef.current.volume = 0.5
    trumpetsSoundRef.current.volume = 0.8
    cheersSoundRef.current.volume = 0.8
    // Manage steps
    const [step, setStep] = useState(1)

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
                        updatedPlayersPoints[playerIndex].victoryCount += 1;
                    } else {
                        updatedPlayersPoints.push({
                            player: firstPlayer,
                            victoryCount: 1,
                        });
                    }

                    game.scores.forEach((score) => {
                        const playerIndex = updatedPlayersPoints.findIndex(
                            (p) => p.player?.name === score.player.name
                        );

                        if (playerIndex !== -1) {
                            updatedPlayersPoints[playerIndex].participationCount =
                                (updatedPlayersPoints[playerIndex].participationCount ?? 0) + 1;
                        } else {
                            updatedPlayersPoints.push({
                                player: score.player,
                                victoryCount: 0,
                                participationCount: 1,
                            });
                        }
                    });
                }
            });
            updatedPlayersPoints.sort((a, b) => b.victoryCount - a.victoryCount);

            setPlayersPoints(updatedPlayersPoints);

            console.table(updatedPlayersPoints)
        }
    }, [data]);

    console.log(playersPoints)

    useEffect(() => {
        if (step === 2) {
            const timers: any[] = [];

            // Manage 3rd player timers
            const thirdPlayerTimer = setTimeout(() => {
                setThirdPlayerIsShown(true)
                sillyTrumpetSoundRef.current.play();
                soloClapSoundRef.current.play()
            }, 1000);
            const thirdPlayerNameTimer = setTimeout(() => {
                setThirdPlayerNameIsShown(true)
            }, 3000);
            const moveThirdPlayerTimer = setTimeout(() => {
                setMoveThirdPlayer(true)
            }, 5000);
            const thirdPlayerSparkles = setTimeout(() => {
                setThirdIsSparkling(true)
            }, 5200);

            timers.push(thirdPlayerTimer, thirdPlayerNameTimer, moveThirdPlayerTimer, thirdPlayerSparkles);

            // Manage 2nd player timers
            const secondPlayerTimer = setTimeout(() => {
                setSecondPlayerIsShown(true)
                // tadaaSound1Ref.current.currentTime = 0;
                lessSillytTrumpetSoundRed.current.play();
                moreClapsSoundRef.current.play();
            }, 5000);
            const secondPlayerNameTimer = setTimeout(() => {
                setSecondPlayerNameIsShown(true)
            }, 7000);
            const moveSecondPlayerTimer = setTimeout(() => {
                setMoveSecondPlayer(true)
            }, 9000);
            const secondPlayerSparkles = setTimeout(() => {
                setSecondIsSparkling(true)
            }, 9200);

            timers.push(secondPlayerTimer, secondPlayerNameTimer, moveSecondPlayerTimer, secondPlayerSparkles);

            // Manage 1st player timers
            const firstPlayerEntrySoundTimer = setTimeout(() => {
                tadaaSound3Ref.current.play();
            }, 8980);
            const firstPlayerTimer = setTimeout(() => {
                setFirstPlayerIsShown(true)
            }, 9000);
            const firstPlayerNameTimer = setTimeout(() => {
                setFirstPlayerNameIsShown(true)
            }, 11000);
            const moveFirstPlayerTimer = setTimeout(() => {
                setMoveFirstPlayer(true)
            }, 13000);
            const firstPlayerSparkles = setTimeout(() => {
                setFirstIsSparkling(true)
            }, 13200);

            timers.push(firstPlayerEntrySoundTimer, firstPlayerTimer, firstPlayerNameTimer, moveFirstPlayerTimer, firstPlayerSparkles);

            // Manage dark background & spotlight timers
            const darkBackground = setTimeout(() => {
                setDarkBackground(true)
            }, 10000);
            const light = setTimeout(() => {
                setSpotLight(true);
            }, 10500);
            const removeDarkBackground = setTimeout(() => {
                setDarkBackground(false);
            }, 14000);

            timers.push(darkBackground, light, removeDarkBackground);

            // Manage confetti timers
            const confettiTimer = setTimeout(() => {
                setIsExploding(true);
            }, 11000);

            timers.push(confettiTimer);

            // Manage 1st player sounds timers
            const cheersPlay = setTimeout(() => {
                trumpetsSoundRef.current.play();
                cheersSoundRef.current.play();
            }, 10700)

            timers.push(cheersPlay);

            // Manage final background timer
            const changeBackgroundTimer = setTimeout(() => {
                setNewBackground(true)
            }, 14000)

            const finalPodiumBackground = setTimeout(() => {
                setFinalPodiumBackground(true)
            }, 14000)

            timers.push(changeBackgroundTimer, finalPodiumBackground);

            return () => {
                timers.forEach(timer => clearTimeout(timer));
                setSpotLight(false)
            }
        }
    }, [step]);

    const muteSounds = () => {
        if (mutedSounds) {
            tadaaSound1Ref.current.muted = false;
            tadaaSound2Ref.current.muted = false;
            tadaaSound3Ref.current.muted = false;
            cheersSoundRef.current.muted = false;
            trumpetsSoundRef.current.muted = false;
            setMutedSounds(false)
        } else {
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
            <AnimatePresence>
                {step === 1 &&
                    (
                        <motion.div
                            key="step1"
                            initial={{opacity: 1}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                        >
                            <Ranking
                                playersData={playersPoints}
                            />
                            {/*<div>*/}
                            {/*    {*/}
                            {/*        playersPoints.map((p) => (*/}
                            {/*            <div>*/}
                            {/*                {p.player.name}*/}
                            {/*                <p>Participations</p>*/}
                            {/*                {p.participationCount}*/}
                            {/*                <p>Victoires</p>*/}
                            {/*                {p.victoryCount}*/}
                            {/*            </div>*/}
                            {/*        ))*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div
                                className={styles.goTo_podium}
                            >
                                <ThemeProvider
                                    theme={blueTheme}
                                >
                                    <IconButton
                                        color='primary'
                                        onClick={() => setStep(prevState => prevState + 1)}
                                    >
                                        <EmojiEventsIcon
                                            fontSize='medium'
                                        />
                                    </IconButton>
                                </ThemeProvider>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <AnimatePresence>
                {step === 2 &&
                    (
                        <motion.div
                            key="step2"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 1, delay: 0.5}}
                            className={`${styles.newRanking_container} ${newBackground ? `${styles.updated}` : ''} `}
                        >
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 2.5}}
                                className={styles.title}
                            >
                                <img
                                    src={cup}
                                    alt={'cup'}
                                    style={{height: '3vh'}}
                                />
                                <SparklesComponent>
                                    <h1>
                                        Podium
                                    </h1>
                                </SparklesComponent>
                                <img
                                    src={cup}
                                    alt={'cup'}
                                    style={{height: '3vh'}}
                                />
                            </motion.div>
                            <div
                                className={styles.mute_sound}
                            >
                                <ThemeProvider
                                    theme={blueTheme}
                                >
                                    <IconButton
                                        color={'secondary'}
                                        onClick={muteSounds}
                                    >
                                        {
                                            mutedSounds
                                                ?
                                                <VolumeMuteIcon
                                                    fontSize={'medium'}
                                                />
                                                :
                                                <VolumeOffIcon
                                                    fontSize={'medium'}
                                                />
                                        }
                                    </IconButton>
                                </ThemeProvider>
                            </div>
                            {
                                isExploding &&
                                <ConfettiExplosion
                                    className={`confetti`}
                                    height={"100vh"}
                                    width={2000}
                                />
                            }
                            <div
                                className={`${styles.thirdPlayer} ${thirdPlayerIsShown ? styles.appear : ''} ${moveThirdPlayer ? styles.move : ''} ${finalPodiumBackground ? styles.final : ''} `}
                            >
                                {thirdIsSparkling ? (
                                        <SparklesComponent>
                                            <img
                                                src={thirdMedal} alt={"medal of third best player"}
                                                className={styles.podiumMedal}
                                            />
                                            {
                                                playersPoints.length > 0 &&
                                                <h1
                                                    className={`${styles.playerNameTitle} ${thirdPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}
                                                >
                                                    {playersPoints[2].player?.name}
                                                </h1>
                                            }
                                        </SparklesComponent>
                                    )
                                    :
                                    (
                                        <>
                                            <img
                                                src={thirdMedal}
                                                alt={"medal of third best player"}
                                                className={styles.podiumMedal}
                                            />
                                            {
                                                playersPoints.length > 0 &&

                                                <h1
                                                    className={`${styles.playerNameTitle} ${thirdPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}
                                                >
                                                    {playersPoints[2].player?.name}
                                                </h1>
                                            }
                                        </>
                                    )
                                }
                                <div
                                    className={`${styles.playerName} ${thirdPlayerNameIsShown ? styles.playerNameIsShown : ''}`}
                                >
                                    {playersPoints.length > 0 && (
                                        <div
                                            className={styles.player_info}
                                        >
                                            {playersPoints[2].player.picture
                                                ?
                                                <img
                                                    src={playersPoints[2].player?.picture}

                                                    alt={`avatar de ${playersPoints[2].player.name}`}
                                                />
                                                :
                                                <img
                                                    src={defaultAvatar}
                                                    alt={`avatar de ${playersPoints[2].player.name}`}
                                                />
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`${styles.secondPlayer} ${secondPlayerIsShown ? styles.appear : ''} ${moveSecondPlayer ? styles.move : ''} ${finalPodiumBackground ? styles.final : ''}`}
                            >
                                {secondIsSparkling ?
                                    (
                                        <SparklesComponent>
                                            <img
                                                src={secondMedal}
                                                alt={"medal of second best player"}
                                                className={styles.podiumMedal}
                                            />
                                            {
                                                playersPoints.length > 0 &&
                                                <h1
                                                    className={`${styles.playerNameTitle} ${secondPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}
                                                >
                                                    {playersPoints[1].player?.name}
                                                </h1>
                                            }
                                        </SparklesComponent>
                                    )
                                    :
                                    (
                                        <>
                                            <img
                                                src={secondMedal}
                                                alt={"medal of second best player"}
                                                className={styles.podiumMedal}
                                            />
                                            {
                                                playersPoints.length > 0 &&
                                                <h1
                                                    className={`${styles.playerNameTitle} ${secondPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}
                                                >
                                                    {playersPoints[1].player?.name}
                                                </h1>
                                            }
                                        </>
                                    )
                                }
                                <div
                                    className={`${styles.playerName} ${secondPlayerNameIsShown ? styles.playerNameIsShown : ''}`}
                                >
                                    {playersPoints.length > 0 && (
                                        <div
                                            className={styles.player_info}
                                        >
                                            {
                                                playersPoints[1].player.picture
                                                    ?
                                                    <img
                                                        src={playersPoints[1].player?.picture}

                                                        alt={`avatar de ${playersPoints[1].player.name}`}
                                                    />
                                                    :
                                                    <img
                                                        src={defaultAvatar}
                                                        alt={`avatar de ${playersPoints[1].player.name}`}
                                                    />
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`${styles.firstPlayer} ${firstPlayerIsShown ? styles.appear : ''} ${moveFirstPlayer ? styles.move : ''}  ${finalPodiumBackground ? styles.final : ''}`}
                            >
                                {firstIsSparkling
                                    ?
                                    (<SparklesComponent>
                                        <img
                                            src={cup}
                                            alt={"cup of the Catan king"}
                                            className={styles.podiumMedal}
                                        />
                                        {
                                            playersPoints.length > 0 &&
                                            <h1
                                                className={`${styles.playerNameTitle} ${firstPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}
                                            >
                                                {playersPoints[0].player?.name}
                                            </h1>
                                        }
                                    </SparklesComponent>)
                                    :
                                    (
                                        <>
                                            <img
                                                src={cup}
                                                alt={"cup of the Catan king"}
                                                className={styles.podiumMedal}
                                            />
                                            {
                                                playersPoints.length > 0 &&
                                                <h1
                                                    className={`${styles.playerNameTitle} ${firstPlayerNameIsShown ? styles.playerNameTitleIsShown : ''}`}
                                                >
                                                    {playersPoints[0].player?.name}
                                                </h1>
                                            }
                                        </>
                                    )
                                }
                                <div
                                    className={`${styles.playerName} ${firstPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                                    {playersPoints.length > 0 && (
                                        <div
                                            className={styles.player_info}
                                        >
                                            {
                                                playersPoints[0].player.picture
                                                    ?
                                                    <img
                                                        src={playersPoints[0].player?.picture}
                                                        alt={`avatar de ${playersPoints[0].player.name}`}
                                                    />
                                                    :
                                                    <img
                                                        src={defaultAvatar}
                                                        alt={`avatar de ${playersPoints[0].player.name}`}
                                                    />
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                            {
                                spotLight
                                    ?
                                    (
                                        <div
                                            className={`${styles.lightCircleOff} ${darkBackground ? styles.lightCircleOn : ''} ${moveFirstPlayer ? styles.move : ""}`}>
                                        </div>
                                    )
                                    :
                                    null
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}