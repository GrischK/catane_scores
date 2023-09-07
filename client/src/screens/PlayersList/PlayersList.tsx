import React, {MouseEventHandler, useState} from "react";
import styles from './PlayersList.module.css';
import {useCreateUserMutation, useDeleteUserMutation, useUsersQuery} from "../../gql/generated/schema";


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
        setNewPlayer({ name: "" });
    };

    const onClickDeletePlayer: MouseEventHandler<HTMLButtonElement> = (event) => {
        const playerId = event.currentTarget.getAttribute("data-player-id");
        if (playerId) {
            deletePlayer({ variables: { deleteUserId: parseInt(playerId) } })
                .then(({ data }) => {
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
            {data?.users.map((user, index) => {
                return (
                    <div key={index} className={styles.player_wrapper}>
                        <h1>{user.name}</h1>;
                        <button onClick={onClickDeletePlayer} data-player-id={user.id}>Supprimer</button>
                    </div>
                )
            })}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <div>
                <input
                    type="text"
                    placeholder="Nom du joueur"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({name: e.target.value})}
                />
                <button
                    onClick={onClickCreateNewPlayer}>
                    Ajouter
                </button>
            </div>
        </div>
    )
}
