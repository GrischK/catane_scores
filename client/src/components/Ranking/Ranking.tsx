import styles from './Ranking.module.css';
import React, {useEffect, useRef, useState} from "react";
import {PlayersPoints} from "../../interfaces/ranking.interface";
import {ReactComponent as Crown} from "../../assets/images/crown.svg"
import defaultAvatar from "../../assets/images/default_avatar.png";
import trumpet from "../../assets/images/trumpet.png"
import {useGamesQuery} from "../../gql/generated/schema";
import ConfettiExplosion from 'react-confetti-explosion';
import {ThemeProvider} from '@mui/material/styles';
import MysteriousText from "../MysteriousText";
import PointsDetailCard from "../PointsDetailsCard/PointsDetailCard";
import {motion, useInView} from 'framer-motion';
import {blueTheme} from "../../utils/stylesVariantes";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {calculateTotalPoint} from "../../utils/functions";

interface RankingProps {
    playersData: PlayersPoints[],
}

export interface playerRankingDetails {
    playerInfo: PlayersPoints,
    totalScore: number,
}

export default function Ranking({playersData}: RankingProps) {
    const ref = useRef(null)
    const isInView = useInView(ref)

    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])

    const [showArrowButton, setShowArrowButton] = useState(false)
    const [mysteriousTextIsShown, setMysteriousTextIsShown] = useState(false)

    const [isExploding, setIsExploding] = React.useState(false);
    const [hasExploded, setHasExploded] = useState(false);

    const totalPointsArray: playerRankingDetails[] = [];

    playersData.forEach((player) => {
        const totalPoints = calculateTotalPoint(player)
        const playerData = {
            playerInfo: player,
            totalScore: totalPoints
        }

        // Check if player already exists in array
        const existingIndex = totalPointsArray.findIndex(item => item.playerInfo.player.name === player.player.name);

        // Add player to ranking array if doesn't exists
        if (existingIndex === -1) {
            totalPointsArray.push(playerData);
        }
    })

    const comparer = (a: playerRankingDetails, b: playerRankingDetails) => {
        if (a.totalScore === b.totalScore) return 0;
        return a.totalScore > b.totalScore ? -1 : 1;
    };

    totalPointsArray.sort(comparer);

    console.log('total point array')
    console.log(totalPointsArray)

    useEffect(() => {
        const timers: any[] = [];

        if (!hasExploded) {
            const isExplodingTimer = setTimeout(() => {
                setIsExploding(true);
                setHasExploded(true);
            }, 500);

            const isNotExplodingTimer = setTimeout(() => {
                setIsExploding(false);
            }, 3000);

            timers.push(isExplodingTimer, isNotExplodingTimer);
        }

        const arrowButtonTimer = setTimeout(() => {
            setShowArrowButton(true)
        }, 2500)

        const mysteriousTextTimer = setTimeout(() => {
            setMysteriousTextIsShown(true)
        }, 1000)

        timers.push(arrowButtonTimer, mysteriousTextTimer);

        // console.log("Element is in view: ", isInView);
        // console.log("Element is in view: ", ref);

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [isInView, hasExploded, ref]);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        window.history.scrollRestoration = 'manual'

        function handleScroll() {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll);

        return () =>
            window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <div
            className={styles.ranking_container}
        >
            <motion.div
                initial={{x: '-100vw'}}
                animate={{x: 'calc(-40vw - ' + scrollY * 1.5 + 'px)', y: '25vh'}}
                transition={{delay: 0.1}}
                className={styles.trumpet_left}
                style={{x: 'calc(-35vw - ' + scrollY * 1.5 + 'px)'}}
            >
                <img
                    src={trumpet}
                    alt={'trumpet'}
                />
            </motion.div>
            <motion.div
                initial={{x: '100vw'}}
                animate={{x: 'calc(40vw + ' + scrollY * 1.5 + 'px)', y: '25vh'}}
                transition={{delay: 0.1}}
                className={styles.trumpet_right}
                style={{x: 'calc(35vw + ' + scrollY * 1.5 + 'px)'}}
            >
                <img
                    src={trumpet}
                    alt={'trumpet'}
                />
            </motion.div>
            {isExploding &&
                <ConfettiExplosion
                    height={"100vh"}
                    width={2000}
                />
            }
            <div
                style={{height: '2.5rem'}}
            >
                {mysteriousTextIsShown &&
                    <motion.h1
                        initial={{x: '-100vw'}}
                        animate={{x: 1}}
                        transition={
                            {delay: 0.5}
                        }
                        className={styles.players_list_title}
                    >
                        <MysteriousText
                            colorsList={["#f04d4d", "#F58F8F", "#ffd903", "#FFED85", "#5ba1fc", "#87BAFD"]}
                        >
                            Trône du Catane
                        </MysteriousText>
                    </motion.h1>
                }
            </div>
            <motion.div
                className={styles.king_of_catan}
                initial={{opacity: 0, scale: 0.3}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                    delay: 0.5,
                    duration: 0.7,
                    ease: [0, 0.71, 0.2, 1.01],
                    type: "spring",
                    damping: 8,
                    stiffness: 100,
                }}
            >
                {totalPointsArray.length > 0 &&
                    (
                        <div
                            className={styles.player_info}
                        >
                            {totalPointsArray[0].playerInfo.player.picture
                                ?
                                <PointsDetailCard
                                    key={1}
                                    data={totalPointsArray[0].playerInfo}
                                />
                                :
                                <img
                                    src={defaultAvatar}
                                    alt={`avatar de ${totalPointsArray[0].playerInfo.player.name}`}
                                />
                            }
                            <motion.div
                                initial={{opacity: 0, scale: 0.3, y: '-1000%', x: 0}}
                                animate={{opacity: 1, scale: 1, y: '-320%', x: 0}}
                                transition={{
                                    delay: 1,
                                    duration: 0.7,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    type: "spring",
                                    damping: 10,
                                    stiffness: 50,
                                }}
                            >
                                <Crown
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        zIndex: "1000",
                                        fill: "#ffd903",
                                    }}
                                />
                            </motion.div>
                        </div>
                    )}
                {showArrowButton &&
                    (
                        <ThemeProvider
                            theme={blueTheme}
                        >
                            <motion.a
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1.5}}
                                transition={{
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}
                                whileHover={{scale: 2}}
                                href={"#rest_of_players"}
                            >
                                <ArrowDownwardIcon
                                    color={'primary'}
                                    fontSize={'large'}
                                />
                            </motion.a>
                        </ThemeProvider>
                    )
                }
            </motion.div>
            <div
                className={styles.ranking}
                id={"rest_of_players"}
                ref={ref}
            >
                {totalPointsArray.length > 0 &&
                    (
                        totalPointsArray.slice(1).map((p, index) =>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: isInView ? 0 : '100vh', // décalage initial uniquement si dans la vue
                                }}
                                animate={{
                                    opacity: 1,
                                    y: isInView ? 0 : '100vh', // décalage d'animation uniquement si dans la vue
                                }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.17, 0.55, 0.55, 1],
                                    delay: isInView ? index * 0.2 : 0, // délai seulement si dans la vue
                                }}
                                className={styles.player_info}
                                key={p.playerInfo.player.id}
                            >
                                <PointsDetailCard
                                    key={index + 2}
                                    data={p.playerInfo}
                                />
                            </motion.div>
                        )
                    )
                }
            </div>
            {/*<div*/}
            {/*    style={{display: 'flex', gap: '2vw'}}*/}
            {/*>*/}
            {/*    {*/}
            {/*        playersData.map((p, index) => (*/}
            {/*                <PointsDetailCard*/}
            {/*                    key={index}*/}
            {/*                    data={p}*/}
            {/*                />*/}
            {/*            )*/}
            {/*        )*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}