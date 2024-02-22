import React, {useState} from "react";
import {PointsDetailCardProps} from "../../interfaces/pointsDetailCard.interface";
import {isFirstLetterVowel, pointsDetails} from "../../utils/functions";
import styles from "./PointsDetailCard.module.css";
import defaultAvatar from "../../assets/images/default_avatar.png";
import {newGameModalStyle, pointsDetailsModalStyle} from "../../utils/stylesVariantes";
import {Box, Modal, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PointsDetailCard({data, rank}: PointsDetailCardProps) {
    const [openModal, setOpenModal] = useState(false);
    const handleModal = () => setOpenModal(!openModal);

    const pointsInfoDetails = pointsDetails(data)

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
                    {pointsInfoDetails &&
                        (
                            pointsInfoDetails.total <= 1
                                ?
                                `${pointsInfoDetails.total} point`
                                :
                                `${pointsInfoDetails.total} points`
                        )
                    }
                </span>
            </div>
            <Modal
                open={openModal}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                className={styles.points_details_modal}
            >
                <Box
                    id={styles.points_details_modal_box}
                    sx={pointsDetailsModalStyle}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        className={styles.points_details_modal_header}
                    >
                        {
                            isFirstLetterVowel(data.player.name)
                                ?
                                <p>Statistiques d'{data.player.name}</p>
                                :
                                <p>Statistiques de {data.player.name}</p>
                        }
                        <span
                            className={styles.modal_info_player_rank}
                        >
                            {rank}ème
                        </span>
                    </Typography>
                    {
                        pointsInfoDetails &&
                        (
                            <>
                                <p>
                                    {pointsInfoDetails.participationCount} participations ⚔️
                                </p>
                                <p>
                                    {pointsInfoDetails.victoryCount} victoires 🏆
                                </p>
                                <br/>
                                <p>
                                    <strong>
                                        Points
                                    </strong>
                                    &nbsp;de victoire : {pointsInfoDetails.victoryPoints} 🎯
                                </p>
                                <p>
                                    <strong>
                                        Points
                                    </strong>
                                    &nbsp;de participation : {pointsInfoDetails.participationPoints} 🙏
                                </p>
                                <p>
                                    <strong>
                                        {pointsInfoDetails.roundedVictoryPercentage} %
                                    </strong>
                                    &nbsp; de taux de victoire 🔥
                                </p>
                                <p>
                                    <strong>
                                        Points
                                    </strong>
                                    &nbsp;de régularité : {pointsInfoDetails.regularityPoints} 🧠
                                </p>
                                <br/>
                                <strong>
                                    Total des points : {pointsInfoDetails.total} 🎉
                                </strong>
                            </>
                        )
                    }
                    <div
                        className={styles.points_details_modal_close_icon}
                    >
                        <CloseIcon
                            onClick={handleModal}
                        />
                    </div>
                </Box>
            </Modal>
        </>
    )
}