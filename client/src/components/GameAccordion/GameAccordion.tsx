import React from "react";
import {GameAccordionProps} from "../../interfaces/gameAccordion.interface";
import styles from "./GameAccordion.module.css"
import defaultAvatar from "../../assets/images/default_avatar.png";
import Cup from "../../assets/images/cup.png";
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GameAccordion({game, index, onClickDeleteFunction}: GameAccordionProps) {
    const otherPlayers = game.scores?.slice(1) || []
    const avatarBackgroundColors = ["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]

    return (
        <div>
            <Accordion
                className={styles.accordion}
                sx={{
                    borderRadius: '2vh !important',
                    boxShadow: 'rgba(0, 0, 0, 0.19) 0 10px 20px, rgba(0, 0, 0, 0.23) 0 12px 12px',
                    transition: 'box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out',
                    background: `linear-gradient(-50deg, rgba(255, 255, 255, 1) 90%, ${avatarBackgroundColors[index % avatarBackgroundColors.length]} 100%)`
                }}
            >
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon/>}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    className={styles.accordion_summary}
                >
                    <div
                        className={styles.accordion_summary_content}
                    >
                        <p
                            className={styles.accordion_game_info}
                        >
                            {game.date && <span>Le {game.date}</span>}
                            {game.place && <span> à {game.place}</span>}
                        </p>
                        <Typography>
                            <div
                                className={styles.accordion_summary_player_info}
                                key={index}
                            >
                                <div
                                    className={styles.accordion_summary_player_info_container}
                                >
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
                                <span
                                    className={styles.player_score}
                                >
                                    <img
                                        src={Cup}
                                        alt={'King cup'}
                                    />
                                    {game.scores?.[0]?.score} points
                                </span>
                            </div>
                        </Typography>
                        <IconButton
                            aria-label="delete"
                            onClick={onClickDeleteFunction}
                            data-game-id={game.id}
                            sx={{position: 'absolute', top: '0', right: '0'}}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </AccordionSummary>
                <AccordionDetails
                    className={styles.accordion_details}
                >
                    {otherPlayers.length > 0 && otherPlayers.map((player: any, playerIndex: number) => (
                        <div
                            key={playerIndex}
                            className={styles.player_details}
                        >
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

                            {player.player.name}
                            {player.score === 1
                                ?
                                <div>{player.score} <span>point</span></div>
                                :
                                <div>{player.score} <span>points</span></div>
                            }
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}