import styles from './Card.module.css';
import defaultAvatar from '../../assets/images/default_avatar.png';
import {Box, Button, IconButton, Modal, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {MouseEventHandler} from "react";
import React from 'react';

interface CardProps {
    playerName: string,
    playerAvatar: string | null | undefined,
    onClickDeleteFunction: MouseEventHandler<HTMLButtonElement>,
    onClickUpdateFunction: MouseEventHandler<HTMLButtonElement>,
    userId: number,
    gamesCounter: number | undefined,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Card({
                                 playerName,
                                 playerAvatar,
                                 onClickDeleteFunction,
                                 onClickUpdateFunction,
                                 userId,
                                 gamesCounter
                             }: CardProps) {

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div className={styles.card}>
            <h1>{playerName}</h1>
            <div className={styles.card_image_wrapper}>
                {playerAvatar ? <img src={playerAvatar} alt="user picture"/> :
                    <img src={defaultAvatar} alt="user picture"/>}
            </div>
            <div className={styles.players_infos}>
                <h2>Nombre de Catanes :</h2>
                <p> {gamesCounter}</p>
            </div>
            <IconButton aria-label="delete" onClick={onClickDeleteFunction} data-player-id={userId}>
                <DeleteIcon/>
            </IconButton>
            <IconButton aria-label="update" onClick={handleOpenModal} data-player-id={userId}>
                <EditIcon/>
            </IconButton>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
