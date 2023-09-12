import React, {MouseEventHandler, useEffect, useState} from "react";
import styles from './PlayersList.module.css';
import {
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUsersQuery
} from "../../gql/generated/schema";
import {Alert, Button, Snackbar} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Card from "../../components/Card/Card";
import RandomAvatar from "../../components/RandomAvatar/RandomAvatar";

interface PlayerInterface {
    name: string;
    picture?: string | null;
}

export default function PlayersList() {
    const [newPlayerAvatar, setNewPlayerAvatar] = useState("");
    const [newPlayer, setNewPlayer] = useState<PlayerInterface>({
        name: "",
        picture: "",
    },)
    const [errorMessage, setErrorMessage] = useState(""); // État pour stocker le message d'erreur
    const [open, setOpen] = React.useState(false);
    const [playerToUpdateData, setPlayerToUpdateData] = useState<PlayerInterface>({
        name: ""
    })

    useEffect(() => {
        setNewPlayer((prevState) => ({...prevState, picture: newPlayerAvatar || ""}));
    }, [newPlayerAvatar]);

    const {data, refetch} = useUsersQuery();

    const [createNewPlayer] = useCreateUserMutation({
        onCompleted: () => refetch()
    });

    const [updatePlayer] = useUpdateUserMutation({onCompleted: () => refetch()})

    const [deletePlayer] = useDeleteUserMutation({onCompleted: () => refetch()})

    const onClickCreateNewPlayer = () => {
        if (newPlayer.name.trim() !== "") { // Vérifie si le nom n'est pas vide ou composé uniquement d'espaces
            createNewPlayer({variables: {data: newPlayer}});
            setNewPlayer({name: ""});
        } else {
            setOpen(true)
            setErrorMessage("Le nom du joueur ne peut pas être vide.");
        }
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
                    setOpen(true)
                    setErrorMessage("Impossible de supprimer l'utilisateur en raison de parties enregistrées.");
                });
        }
    };

    const onClickUpdatePlayer: MouseEventHandler<HTMLButtonElement> = (event) => {
        const playerToUpdateId = event.currentTarget.getAttribute("data-player-id");
        if (playerToUpdateId && playerToUpdateData.name !== "") {
            updatePlayer({variables: {updateUserId: parseInt(playerToUpdateId), data: playerToUpdateData}})
                .then(({data}) => {
                    refetch();
                })
                .catch((error) => {
                    console.error(error);
                    setOpen(true)
                    setErrorMessage("Impossible de supprimer l'utilisateur en raison de parties enregistrées.");
                });
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={styles.players_list_container} id="players_list">
            <h1 className={styles.title}>Liste des Cataneurs</h1>
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
                        <Card key={index}
                              playerName={user.name}
                              playerAvatar={user.picture}
                              gamesCounter={user.games?.length}
                              userId={user.id}
                              onClickDeleteFunction={onClickDeletePlayer}
                              onClickUpdateFunction={onClickUpdatePlayer}
                        />
                    )
                })}
            </div>
            {errorMessage &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            }

            <div className={styles.add_player_container}>
                <h1 className={styles.title}>Ajouter un Cataneur</h1>
                <input
                    required={true}
                    type="text"
                    placeholder="Nom du joueur"
                    value={newPlayer.name}
                    onChange={(e) =>
                        setNewPlayer((prevState) => ({
                                ...prevState,
                                name: e.target.value,
                            })
                        )
                    }
                />
                <RandomAvatar onChange={setNewPlayerAvatar}/>

                <Button variant="contained" onClick={onClickCreateNewPlayer} endIcon={<SendIcon/>}>
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
