import styles from './Card.module.css';
import defaultAvatar from '../../assets/images/default_avatar.png';
import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {MouseEventHandler, useState} from "react";
import React from 'react';
import {useUpdateUserMutation} from "../../gql/generated/schema";
import SendIcon from "@mui/icons-material/Send";
import RandomAvatar from "../RandomAvatar/RandomAvatar";

interface CardProps {
    playerName: string,
    playerAvatar: string | null | undefined,
    onClickDeleteFunction: MouseEventHandler<HTMLButtonElement>,
    userId: number,
    gamesCounter: number | undefined,
    refreshPlayersList: any,
    playerRank: number | undefined
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

interface PlayerInterface {
    name: string;
    picture?: string | null;
}

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
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [playerToUpdateData, setPlayerToUpdateData] = useState<PlayerInterface>({
        name: playerName,
        picture: playerAvatar
    })

    const [updatePlayer] = useUpdateUserMutation(
        // {onCompleted: () => refetch()}
    )

    const avatarBackgroundColors = ["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]

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
                    // setOpen(true)
                    // setErrorMessage("Impossible de supprimer l'utilisateur en raison de parties enregistrées.");
                });
        }
    }

    return (
        <div className={styles.card}>
            <h1>{playerName}</h1>
            <div
                className={styles.card_image_wrapper}
                style={{backgroundColor: avatarBackgroundColors[Math.floor(Math.random() * avatarBackgroundColors.length)]}}
            >
                {playerAvatar
                    ?
                    <img src={playerAvatar} alt="user picture"/>
                    :
                    <img src={defaultAvatar} alt="user picture"/>
                }
            </div>
            <div className={styles.players_infos}>
                <h2>Nombre de Catanes :</h2>
                <p> {gamesCounter}</p>
            </div>
            <div className={styles.players_infos}>
                <h2>Classement :</h2>
                <p> {playerRank}</p>
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
                <Box id={styles.update_player_modal} sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Modifier {playerName}
                    </Typography>
                    {/*<input*/}
                    {/*    required={true}*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Nom du joueur"*/}
                    {/*    value={playerToUpdateData.name}*/}
                    {/*    onChange={(e) =>*/}
                    {/*        setPlayerToUpdateData((prevState) => ({*/}
                    {/*                ...prevState,*/}
                    {/*                name: e.target.value,*/}
                    {/*            })*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*/>*/}

                    <TextField
                        required={true}
                        className={styles.update_player_name_input}
                        label="Nom"
                        type="text"
                        value={playerToUpdateData.name}
                        onChange={(e) =>
                            setPlayerToUpdateData((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                })
                            )
                        }
                    />
                    <RandomAvatar
                        onChange={(newAvatar: string) =>
                            setPlayerToUpdateData((prevState) => ({
                                    ...prevState,
                                    picture: newAvatar,
                                })
                            )
                        }/>
                    <Button variant="contained" onClick={onClickUpdatePlayer} endIcon={<SendIcon/>}
                            data-player-id={userId}>
                        Modifier
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
