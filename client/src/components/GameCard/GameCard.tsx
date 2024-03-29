import React, {useState} from "react";
import {GameCardProps} from "../../interfaces/gameCard.interface";
import styles from "./GameCard.module.css"
import defaultAvatar from "../../assets/images/default_avatar.png";
import Cup from "../../assets/images/cup.png";
import ColoredButton from "../ColoredButton/ColoredButton";
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import {Box, IconButton, Modal} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {modalStyle} from "../../utils/stylesVariantes";
import {buttonTransition} from "../../utils/animationVariants";
import {motion} from "framer-motion";
import {yellow} from "@mui/material/colors";

export default function GameCard({game, index, onClickDeleteFunction, dataGameId}: GameCardProps) {
    const [flip, setFlip] = useState(false);
    const otherPlayers = game.scores?.slice(1) || [];
    const avatarBackgroundColors = ["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"];
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleFlip = () => {
        setFlip(!flip);
    }

    return (
        <div
            className={styles.gameCard}
        >
            <div
                className={`${styles.gameCard_container} ${flip ? styles.gameCard_container_flipped : ''}`}
            >
                <div
                    className={styles.gameCard_front}
                >
                    <div
                        className={styles.gameCard_front_info_container}
                        onClick={handleFlip}
                    >
                        <p
                            className={styles.gameCard_game_info}
                        >
                            {game.date && <span>Le {game.date}</span>}
                            {game.place && <span> à {game.place}</span>}
                        </p>
                        <div
                            className={styles.gameCard_player_info_container}
                        >
                            <div
                                className={styles.gameCard_player_info}
                            >
                                {game.scores?.[0]?.player?.picture ?
                                    <img
                                        src={game.scores?.[0]?.player?.picture}
                                        alt={game.scores?.[0]?.player?.name}
                                        style={{background: '#FED402'}}
                                    />
                                    :
                                    <img
                                        src={defaultAvatar}
                                        alt={"avatar"}
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
                <div
                    className={styles.gameCard_back}
                    onClick={handleFlip}
                >
                    <div
                        className={styles.delete_icon}
                    >
                        <IconButton
                            aria-label="delete"
                            onClick={handleOpenModal}
                            data-game-id={game.id}
                            sx={{position: 'absolute', top: '0', right: '0', zIndex: '10'}}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                    {otherPlayers.length > 0 && otherPlayers.map((player: any, playerIndex: number) => (
                        <div
                            key={playerIndex}
                            className={styles.player_details}
                        >
                            {player.player.name}
                            {player.player.picture ?
                                <img
                                    src={player.player.picture}
                                    alt={player.player.name}
                                    className={styles.score_player_picture}
                                    style={{backgroundColor: avatarBackgroundColors[playerIndex <= 3 ? playerIndex : (playerIndex - 4)]}}
                                />
                                :
                                <img
                                    src={defaultAvatar}
                                    alt={player.player.name}
                                    className={styles.score_player_picture}
                                    style={{backgroundColor: avatarBackgroundColors[playerIndex <= 3 ? playerIndex : (playerIndex - 4)]}}
                                />
                            }
                            {player.score === 1
                                ?
                                <div>
                                    {player.score}
                                    <span>
                                        point
                                    </span>
                                </div>
                                :
                                <div>
                                    {player.score}
                                    <span>
                                        points
                                    </span>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box
                    id={styles.update_player_modal}
                    sx={modalStyle}
                >
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={buttonTransition}
                    >
                        <ColoredButton
                            bgColor={'green'}
                            onClick={onClickDeleteFunction}
                            dataGameId={dataGameId}
                        >
                            Supprimer
                        </ColoredButton>
                    </motion.div>
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={buttonTransition}
                    >
                        <ColoredButton
                            bgColor={'red'}
                            onClick={handleCloseModal}
                        >
                            Annuler
                        </ColoredButton>
                    </motion.div>
                </Box>
            </Modal>
        </div>
    )
}