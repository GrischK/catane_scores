import React, {useEffect, useRef, useState} from "react";
import {PlayersPoints} from "../../interfaces/ranking.interface";
import styles from './Ranking.module.css';
import {ReactComponent as Crown} from "../../assets/images/crown.svg"
import {ReactComponent as LaurelCrown} from "../../assets/images/laurel_crown.svg";
import defaultAvatar from "../../assets/images/default_avatar.png";
import {ReactComponent as FlagBase} from "../../assets/images/flag_base.svg";
import {ReactComponent as FlagBody} from "../../assets/images/flag_body.svg";
import {ReactComponent as FlagBottom} from "../../assets/images/flag_bottom.svg";
import trumpet from "../../assets/images/trumpet.png"
import ConfettiExplosion from 'react-confetti-explosion';
import {ThemeProvider} from '@mui/material/styles';
import MysteriousText from "../MysteriousText";
import PointsDetailCard from "../PointsDetailsCard/PointsDetailCard";
import {getFinalRanking} from "../../utils/functions";
import {motion, useInView} from 'framer-motion';
import {blueTheme} from "../../utils/stylesVariantes";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// TODO Export interfaces outside
export interface RankingProps {
    playersData: PlayersPoints[],
}

export interface playerRankingDetails {
    playerInfo: PlayersPoints,
    totalScore: number,
}

export default function Ranking({playersData}: RankingProps) {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const [showArrowButton, setShowArrowButton] = useState(false)
    const [mysteriousTextIsShown, setMysteriousTextIsShown] = useState(false)

    const [isExploding, setIsExploding] = React.useState(false);
    const [hasExploded, setHasExploded] = useState(false);

    const totalPointsArray = getFinalRanking(playersData)

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
        }, 4000)

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
        // Initialize scroll to top to avoid bug with confetti
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
                                <motion.div
                                    whileHover={{y: '-2vh'}}
                                    style={{position: 'relative', cursor: 'pointer'}}
                                >
                                    <PointsDetailCard
                                        key={1}
                                        data={totalPointsArray[0].playerInfo}
                                        rank={1}
                                        displayInfo={false}
                                    />
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.3, y: '-1000%', x: '-50%'}}
                                        animate={{opacity: 1, scale: 1, y: '-280%', x: '-50%'}}
                                        transition={{
                                            delay: 1,
                                            duration: 0.7,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            type: "spring",
                                            damping: 10,
                                            stiffness: 50,
                                        }}
                                        style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}
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
                                </motion.div>
                                :
                                <img
                                    src={defaultAvatar}
                                    alt={`avatar de ${totalPointsArray[0].playerInfo.player.name}`}
                                />
                            }
                            <FlagBase/>
                            <motion.div
                                style={{overflow: 'hidden'}}
                                initial={{height: 0, y: '-3px'}}
                                animate={{height: 100}}
                                transition={{
                                    duration: 0.6,
                                    delay: 3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <div className={styles.king_of_catan_info}>
                                    <p>
                                        {totalPointsArray[0].playerInfo.player.name}
                                    </p>
                                    <p>
                                        {totalPointsArray[0].totalScore}
                                    </p>
                                </div>

                                <FlagBody/>
                            </motion.div>
                            <motion.div
                                initial={{
                                    y: '-3px',
                                    height: 0,
                                    overflow: 'hidden',
                                    rotateX: 180,
                                    transformStyle: 'preserve-3d',
                                    transformOrigin: 'top'
                                }}
                                animate={{y: '-5px', height: 83, overflow: 'unset', rotateX: 0}}
                                transition={{
                                    duration: 1.3,
                                    delay: 3.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}>
                                <FlagBottom/>
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
                                <span
                                    style={{position: 'relative'}}
                                >
                                    {index + 2}ème
                                    <LaurelCrown
                                        className={styles.laurel_crown_icon}
                                    />
                                </span>
                                <motion.div
                                    whileHover={{y: '-2vh'}}
                                    style={{cursor: 'pointer'}}
                                >
                                    <PointsDetailCard
                                        key={index + 2}
                                        rank={index + 2}
                                        data={p.playerInfo}
                                    />
                                </motion.div>
                            </motion.div>
                        )
                    )
                }
            </div>
        </div>
    )
}