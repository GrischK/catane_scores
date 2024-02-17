import styles from "./GameCard.module.css"
import {GameData} from "../../interfaces/game.interface";
import React, {MouseEventHandler, useState} from "react";
import Avatar from "../../assets/images/default_avatar.png"
import defaultAvatar from "../../assets/images/default_avatar.png";
import Cup from "../../assets/images/cup.png";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface GameCardProps {
    game: GameData;
    index: number;
    onClickDeleteFunction?: MouseEventHandler<HTMLButtonElement>;
}

export default function GameCard({game, index, onClickDeleteFunction}: GameCardProps) {
    const [flip, setFlip] = useState(false)
    const otherPlayers = game.scores?.slice(1) || []
    const avatarBackgroundColors = ["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]

    const handleFlip = () => {
        setFlip(!flip);
        console.log(flip)
    }

    return (
        <div
            className={styles.gameCard}

        >
            <div className={`${styles.gameCard_container} ${flip ? styles.gameCard_container_flipped : ''}`}>
                <div className={styles.gameCard_front}>
                    <div className={styles.gameCard_front_info_container}
                         onClick={handleFlip}
                    >
                        <p className={styles.gameCard_game_info}>
                            {game.date && <span>Le {game.date}</span>}
                            {game.place && <span> à {game.place}</span>}
                        </p>
                        <div
                            className={styles.gameCard_player_info_container}
                        >
                            <div className={styles.gameCard_player_info}>
                                {game.scores?.[0]?.player?.picture ?
                                    <img
                                        src={game.scores?.[0]?.player?.picture}
                                        alt={`image de ${game.scores?.[0]?.player?.name}`}
                                        style={{background: '#FED402'}}
                                    />
                                    :
                                    <img
                                        src={defaultAvatar}
                                        alt={`image de ${game.scores?.[0]?.player?.picture}`}
                                    />
                                }
                                <span
                                    className={styles.player_name}
                                >
                            {game.scores?.[0]?.player?.name}
                        </span>
                            </div>
                            <div
                                className={styles.gameCard_player_score}
                            >
                                <img
                                    src={Cup}
                                    alt={'King cup'}
                                />
                                {game.scores?.[0]?.score} points
                            </div>
                        </div>
                        <div
                            className={styles.frontCard_arrow}
                        >
                            <ArrowDownwardIcon/>
                        </div>
                    </div>
                </div>
                <div className={styles.gameCard_back}
                     onClick={handleFlip}
                >
                    {otherPlayers.length > 0 && otherPlayers.map((player: any, playerIndex: number) => (
                        <div
                            key={playerIndex}
                            className={styles.player_details}
                        >
                            {player.player.name}
                            {player.player.picture ?
                                <img
                                    src={player.player.picture}
                                    alt={`image de ${player.player.name}`}
                                    className={styles.score_player_picture}
                                    style={{backgroundColor: avatarBackgroundColors[playerIndex <= 3 ? playerIndex : (playerIndex - 4)]}}
                                />
                                :
                                <img
                                    src={defaultAvatar}
                                    alt={`image de ${player.player.name}`}
                                    className={styles.score_player_picture}
                                    style={{backgroundColor: avatarBackgroundColors[playerIndex <= 3 ? playerIndex : (playerIndex - 4)]}}
                                />
                            }

                            {player.score === 1
                                ?
                                <div>{player.score} <span>point</span></div>
                                :
                                <div>{player.score} <span>points</span></div>
                            }
                        </div>
                    ))}
                    <IconButton
                        aria-label="delete"
                        onClick={onClickDeleteFunction}
                        data-game-id={game.id}
                        sx={{position: 'absolute', top: '0', right: '0', zIndex: '10'}}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )

}