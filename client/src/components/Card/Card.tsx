import styles from './Card.module.css';
import React from 'react';
import {MouseEventHandler, useState} from "react";
import {CardProps} from "../../interfaces/card.interface";
import {PlayerInterface} from "../../interfaces/playersListPage.interface";
import defaultAvatar from '../../assets/images/default_avatar.png';
import {useUpdateUserMutation} from "../../gql/generated/schema";
import RandomAvatar from "../RandomAvatar/RandomAvatar";
import ColoredButton from "../ColoredButton/ColoredButton";
import ColoredInput from "../ColoredInput/ColoredInput";
import {buttonTransition} from "../../utils/animationVariants";
import {modalStyle, style} from "../../utils/stylesVariantes";
import CloseIcon from '@mui/icons-material/Close';
import {Box, IconButton, Modal, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {motion} from "framer-motion";

export default function Card({
                                 playerName,
                                 playerAvatar,
                                 onClickDeleteFunction,
                                 userId,
                                 gamesCounter,
                                 refreshPlayersList,
                                 playerRank
                             }: CardProps) {

    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const avatarBackgroundColors = ["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]

    const [playerToUpdateData, setPlayerToUpdateData] = useState<PlayerInterface>({
        name: playerName,
        picture: playerAvatar
    })

    const [updatePlayer] = useUpdateUserMutation(
        // {onCompleted: () => refetch()}
    )

    const handeDelete = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClickDeleteFunction && event) {
            onClickDeleteFunction(event)
        }
        handleCloseDeleteModal()
    }

    const onClickUpdatePlayer: MouseEventHandler<HTMLButtonElement> = (event) => {
        const playerToUpdateId = event.currentTarget.getAttribute("data-player-id");
        if (playerToUpdateId && playerToUpdateData.name !== "") {
            updatePlayer({variables: {updateUserId: parseInt(playerToUpdateId), data: playerToUpdateData}})
                .then(({data}) => {
                    refreshPlayersList()
                    setOpenModal(false)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <div
            className={styles.card}
        >
            <h1>
                {playerName}
            </h1>
            <div
                className={styles.card_image_wrapper}
                style={{backgroundColor: avatarBackgroundColors[Math.floor(Math.random() * avatarBackgroundColors.length)]}}
            >
                {playerAvatar
                    ?
                    <img src={playerAvatar} alt={playerName}/>
                    :
                    <img src={defaultAvatar} alt={playerName}/>
                }
            </div>
            <div
                className={styles.players_infos}
            >
                <h2>
                    Nombre de Catanes :
                </h2>
                <p>
                    {gamesCounter}
                </p>
            </div>
            <div
                className={styles.players_infos}
            >
                <h2>
                    Classement :
                </h2>
                <p>
                    {playerRank}
                </p>
            </div>
            <IconButton
                aria-label="delete"
                onClick={handleOpenDeleteModal}
                data-player-id={userId}
            >
                <DeleteIcon/>
            </IconButton>
            <IconButton
                aria-label="update"
                onClick={handleOpenModal}
                data-player-id={userId}
            >
                <EditIcon/>
            </IconButton>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                className={styles.card_modal}
            >
                <Box
                    id={styles.update_player_modal}
                    sx={style}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Modifier {playerName}
                    </Typography>
                    <ColoredInput
                        bgColor={'blue'}
                        label={'nom'}
                        value={playerToUpdateData.name}
                        onChange={(e) =>
                            setPlayerToUpdateData((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                })
                            )}
                    />
                    <RandomAvatar
                        onChange={(newAvatar: string) =>
                            setPlayerToUpdateData((prevState) => ({
                                    ...prevState,
                                    picture: newAvatar,
                                })
                            )
                        }/>
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={buttonTransition}
                    >
                        <ColoredButton
                            bgColor={'blue'}
                            onClick={onClickUpdatePlayer}
                            dataPlayerId={userId}
                            style={{
                                width: '16vw',
                                height: '6vh',
                                fontSize: '1rem'
                            }}
                        >
                            Modifier
                        </ColoredButton>
                    </motion.div>
                    <CloseIcon
                        onClick={handleCloseModal}
                        className={styles.update_player_close_modal_icon}
                    />
                </Box>
            </Modal>
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box
                    sx={modalStyle}
                >
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={buttonTransition}
                    >
                        <ColoredButton
                            bgColor={'green'}
                            onClick={handeDelete}
                            dataPlayerId={userId}
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
                            onClick={handleCloseDeleteModal}
                        >
                            Annuler
                        </ColoredButton>
                    </motion.div>
                </Box>
            </Modal>
        </div>
    )
}
