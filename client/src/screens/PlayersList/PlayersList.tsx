import React, {MouseEventHandler, useState} from "react";
import styles from './PlayersList.module.css';
import {useCreateUserMutation, useDeleteUserMutation, useUsersQuery} from "../../gql/generated/schema";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Card from "../../components/Card";

export default function PlayersList() {
    const [newPlayer, setNewPlayer] = useState({name: ""},)
    const [errorMessage, setErrorMessage] = useState(""); // État pour stocker le message d'erreur

    const {data, refetch} = useUsersQuery();

    const [createNewPlayer] = useCreateUserMutation({
        onCompleted: () => refetch()
    });

    const [deletePlayer] = useDeleteUserMutation({onCompleted: () => refetch()})

    const onClickCreateNewPlayer = () => {
        createNewPlayer({variables: {data: newPlayer}});
        setNewPlayer({name: ""});
    };

    const onClickDeletePlayer: MouseEventHandler<HTMLButtonElement> = (event) => {
        const playerId = event.currentTarget.getAttribute("data-player-id");
        if (playerId) {
            deletePlayer({variables: {deleteUserId: parseInt(playerId)}})
                .then(({data}) => {
                    refetch();
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage("Impossible de supprimer l'utilisateur en raison de parties enregistrées.");
                });
        }
    };

    return (
        <div className={styles.players_list_container}>
            <div className={styles.players_list}>
                {data?.users.map((user, index) => {
                    return (
                        // <div key={index} className={styles.player_wrapper}>
                        //     <h1>{user.name}</h1>
                        //     <IconButton aria-label="delete" onClick={onClickDeletePlayer} data-player-id={user.id} >
                        //         <DeleteIcon />
                        //     </IconButton>
                        //     {/*<button onClick={onClickDeletePlayer} data-player-id={user.id}>Supprimer</button>*/}
                        // </div>
                        <Card/>

                    )
                })}
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <div className={styles.add_player_container}>
                <input
                    type="text"
                    placeholder="Nom du joueur"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({name: e.target.value})}
                />

                <Button variant="contained" onClick={onClickCreateNewPlayer} endIcon={<SendIcon />}>
                    Ajouter
                </Button>
                {/*<button*/}
                {/*    onClick={onClickCreateNewPlayer}>*/}
                {/*    Ajouter*/}
                {/*</button>*/}
            </div>
        </div>
    )
}
