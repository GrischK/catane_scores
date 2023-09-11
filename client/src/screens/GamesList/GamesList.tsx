import React, {MouseEventHandler} from "react";
import styles from './GamesList.module.css';
import {useDeleteGameMutation, useGamesQuery} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GamesList() {

    const {data, refetch} = useGamesQuery()
    const sortedGames = data?.games.slice().sort((a, b) => b.id - a.id);

    const [deleteGame] = useDeleteGameMutation({onCompleted: () => refetch()})

    const onClickDeleteGame: MouseEventHandler<HTMLButtonElement> = (event) => {
        const gameId = event.currentTarget.getAttribute("data-game-id");
        if (gameId) {
            deleteGame({variables: {deleteGameId: parseInt(gameId)}})
                .then(({data}) => {
                    refetch();
                })
                .catch((error) => {
                    console.error(error);
                    // setOpen(true)
                    // setErrorMessage("Impossible de supprimer l'utilisateur en raison de parties enregistrées.");
                });
        }
    };

    return (
        <div className={styles.games_list_container}>
            {sortedGames?.map((game, index) => (
                <div key={index} className={styles.games_details}>
                    <div className={styles.games_infos_wrapper}>
                        <div className={styles.games_infos}>
                            {game.date && <span>{game.date}</span>}
                            {game.place && <span>{game.place}</span>}
                            {/*{game.picture && <img src={game.picture} alt={`image du Catan du ${game.date}`}/>}*/}
                        </div>
                        <IconButton
                            aria-label="delete"
                            onClick={onClickDeleteGame}
                            data-game-id={game.id}
                            className={styles.delete_game_button}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>


                    <div className={styles.player_cards}>
                        {game.players.map((player, index) => (
                            <div key={index} className={styles.player_details}>
                                {player.picture ?
                                    <img src={player.picture}
                                         alt={`image de ${player.name}`}
                                    />
                                    :
                                    <img src={defaultAvatar}
                                         alt={`image de ${player.name}`}
                                    />
                                }
                                <span>{player.name}</span>
                            </div>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    )
}
