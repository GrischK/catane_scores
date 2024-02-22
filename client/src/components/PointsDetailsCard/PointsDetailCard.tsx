import React, {useState} from "react";
import {PlayersPoints} from "../../interfaces/ranking.interface";
import {calculateTotalPoint, isFirstLetterVowel} from "../../utils/functions";
import styles from "./PointsDetailCard.module.css";
import defaultAvatar from "../../assets/images/default_avatar.png";
import {newGameModalStyle} from "../../utils/stylesVariantes";
import {Box, Modal, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PointsDetailCardProps {
    data: PlayersPoints,
}

export default function PointsDetailCard({data}: PointsDetailCardProps) {
    const [openModal, setOpenModal] = useState(false);
    const handleModal = () => setOpenModal(!openModal);

    return (
        <>
            <div
                onClick={handleModal}
                className={styles.points_card_details_container}
            >
                {data.player.picture
                    ?
                    <img
                        src={data.player?.picture}
                        alt={`avatar de ${data.player.name}`}
                    />
                    :
                    <img
                        src={defaultAvatar}
                        alt={`avatar de ${data.player.name}`}
                    />
                }
                <h1>
                    {data.player?.name}
                </h1>
                <span>
                    {
                        data.victoryCount <= 1
                            ?
                            `${calculateTotalPoint(data)} point`
                            :
                            `${calculateTotalPoint(data)} points`
                    }
                </span>
            </div>
            <Modal
                open={openModal}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                className={styles.new_game_players_modal}
            >
                <Box
                    id={styles.update_player_modal}
                    sx={newGameModalStyle}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {
                            isFirstLetterVowel(data.player.name)
                                ?
                                <p>Statistiques d'{data.player.name}</p>
                                :
                                <p>Statistiques de {data.player.name}</p>
                        }
                    </Typography>
                    <p>
                        {data.participationCount} participations ⚔️
                    </p>
                    <p>
                        {data.victoryCount} victoires 🏆
                    </p>
                    <br/>
                    <p>
                        <strong>
                            Points
                        </strong>
                        &nbsp;de victoire {data.victoryCount * 3} 🎯
                    </p>
                    <p>
                        <strong>
                            Points
                        </strong>
                        &nbsp;de
                        participation {data.participationCount ? (data.participationCount * 0.25) : ""} 🙏
                    </p>
                    <p>
                        {data.participationCount ? (data.victoryCount / data.participationCount) * 100 : ""} % de taux
                        de victoire 🔥
                    </p>
                    <p>
                        <strong>
                            Points
                        </strong>
                        &nbsp;de
                        régularité {data.participationCount ? ((data.victoryCount / data.participationCount) / 2 * 100) : ""} 🧠
                    </p>
                    <br/>
                    <strong>
                        Total des points : {calculateTotalPoint(data)} 🎉
                    </strong>
                    <CloseIcon
                        onClick={handleModal}
                    />
                </Box>
            </Modal>
        </>
    )
}