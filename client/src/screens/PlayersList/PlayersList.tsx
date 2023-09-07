import React, {MouseEventHandler, useState} from "react";
import styles from './PlayersList.module.css';
import {useCreateUserMutation, useDeleteUserMutation, useUsersQuery} from "../../gql/generated/schema";


export default function PlayersList() {
    const [newPlayer, setNewPlayer] = useState({name: ""},)

    const {data, refetch} = useUsersQuery();

    const [createNewPlayer] = useCreateUserMutation({
        onCompleted: () => refetch()
    });

    const [deletePlayer] = useDeleteUserMutation({onCompleted: () => refetch()})

    const onClickCreateNewPlayer = () => {
        createNewPlayer({variables: {data: newPlayer}});
        setNewPlayer({ name: "" });
    };

    const onClickDeletelayer:MouseEventHandler<HTMLButtonElement> = (event) => {
        const playerId = event.currentTarget.getAttribute("data-player-id");
        console.log(playerId)
        if (playerId) {
            deletePlayer({variables: {deleteUserId: parseInt(playerId)}});
        }
        console.log('clic')
    };

    return (
        <div className={styles.players_list_container}>
            {data?.users.map((user, index) => {
                return (
                    <div className={styles.player_wrapper}>
                        <h1 key={index}>{user.name}</h1>;
                        <button onClick={onClickDeletelayer} data-player-id={user.id}>Supprimer</button>
                    </div>
                )
            })}
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
