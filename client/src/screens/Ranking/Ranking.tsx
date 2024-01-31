import styles from './Ranking.module.css';
import React, {useEffect, useRef, useState} from "react";
import {useGamesQuery, User} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import ConfettiExplosion from 'react-confetti-explosion';
import {motion} from 'framer-motion';
import {ReactComponent as Crown} from "../../assets/images/crown.svg"
import {useInView} from "framer-motion"

interface PlayersPoints {
    player: User;
    playerTotalPoints: number;
}

export default function Ranking() {
    const {data, refetch} = useGamesQuery()
    const [isExploding, setIsExploding] = React.useState(false);
    const ref = useRef(null)
    const isInView = useInView(ref)

    // console.log(data)
    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])
    const [hasExploded, setHasExploded] = useState(false);

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

        console.log("Element is in view: ", isInView);

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [isInView, hasExploded]);

    return (
        <div className={styles.ranking_container}>
            {isExploding &&
                <ConfettiExplosion
                    height={"100vh"}
                    width={2000}
                />
            }
            <h1 className={styles.title}>Roi du Catan</h1>
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
                <motion.div
                    initial={{opacity: 0, scale: 0.3, y: '-1000%', x: '27%'}}
                    animate={{opacity: 1, scale: 1, y: '-300%', x: '27%'}}
                    transition={{
                        delay: 1,
                        duration: 0.7,
                        ease: [0, 0.71, 0.2, 1.01],
                        type: "spring",
                        damping: 10,
                        stiffness: 50,
                    }}
                >
                    <Crown style={{
                        width: "90px",
                        height: "90px",
                        zIndex: "1000",
                        fill: "#ffd903",
                        // position: "absolute",
                        // top: "85px",
                        // left: "55px"
                    }}/>
                </motion.div>
                <button><a href={"#rest_of_players"}>Allez</a></button>
            </motion.div>
            <div
                className={styles.ranking}
                id={"rest_of_players"}
                ref={ref}
            >
                {playersPoints.length > 0 && (
                    playersPoints.slice(1).map((p, index) =>
                        <motion.div
                            style={{
                                transform: isInView ? "none" : "translateY(200px)",
                                opacity: isInView ? 1 : 0,
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                            }}
                            className={styles.player_info}
                            key={p.player.id}
                        >
                            <span>{index + 2}ème</span>
                            {p.player.picture ?
                                <img src={p.player?.picture}
                                     alt={`avatar de ${p.player.name}`}/>
                                :
                                <img src={defaultAvatar} alt="user picture"/>
                            }
                            <h1>{p.player?.name}</h1>
                            <span>{`Points : ${p.playerTotalPoints}`}</span>
                        </motion.div>
                    )
                )}
            </div>

        </div>
    )
}