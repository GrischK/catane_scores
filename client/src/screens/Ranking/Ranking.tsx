import styles from './Ranking.module.css';
import React, {useEffect, useState} from "react";
import {useGamesQuery, User} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";

interface PlayersPoints {
    player: User;
    playerTotalPoints: number;
}

export default function Ranking() {
    const {data, refetch} = useGamesQuery()

    console.log(data)
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

    console.log(playersPoints)

    return (
        <div className={styles.ranking_container}>
            <h1 className={styles.title}>Roi du Catan</h1>
            <div className={styles.king_of_catan}>
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
            <div className={styles.ranking}>
                {playersPoints.length > 0 && (
                    playersPoints.slice(1).map((p, index) =>
                        <div className={styles.player_info} key={p.player.id}>
                            <span>{index+2}ème</span>
                            {p.player.picture ?
                                <img src={p.player?.picture}
                                     alt={`avatar de ${p.player.name}`}/>
                                :
                                <img src={defaultAvatar} alt="user picture"/>
                            }
                            <h1>{p.player?.name}</h1>
                            <span>{`Points : ${p.playerTotalPoints}`}</span>
                        </div>
                    )
                )}
            </div>

        </div>
    )
}