import React, {MouseEventHandler, useEffect, useState} from "react";
import styles from './PlayersList.module.css';
import {useCreateUserMutation, useDeleteUserMutation, useUsersQuery} from "../../gql/generated/schema";
import {Button} from "@mui/material";
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

    console.log(newPlayerAvatar)
    console.log(newPlayer)

    useEffect(() => {
        setNewPlayer((prevState) => ({...prevState, picture: newPlayerAvatar || ""}));
    }, [newPlayerAvatar]);

    const {data, refetch} = useUsersQuery();

    const [createNewPlayer] = useCreateUserMutation({
        onCompleted: () => refetch()
    });

    const [deletePlayer] = useDeleteUserMutation({onCompleted: () => refetch()})

    const onClickCreateNewPlayer = () => {
        if (newPlayer.name.trim() !== "") { // Vérifie si le nom n'est pas vide ou composé uniquement d'espaces
            createNewPlayer({variables: {data: newPlayer}});
            setNewPlayer({name: ""});
        } else {
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
                        <Card key={index} playerName={user.name} playerAvatar={user.picture}/>
                    )
                })}
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <div className={styles.add_player_container}>
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
