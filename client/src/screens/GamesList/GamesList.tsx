import React, {MouseEventHandler, useEffect} from "react";
import styles from './GamesList.module.css';
import {useDeleteGameMutation, useGamesQuery} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GamesList({ gamesListRefreshed }:any) {
    const { data, refetch } = useGamesQuery()

    useEffect(() => {
        refetch()
    }, [gamesListRefreshed, data]);


    const sortedGames = data?.games.slice().sort((a, b) => b.id - a.id);

    console.log(sortedGames)

    const classedGames = sortedGames?.map((game) => {
        if (game.scores) {
            const sortedScores = [...game.scores];
            sortedScores.sort((a, b) => b.score - a.score);
            return { ...game, scores: sortedScores };
        } else {
            return game;
        }
    });

    console.log(classedGames)

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
                });
        }
    };

    return (
        <div className={styles.games_list_container}>
            {classedGames?.map((game, index) => (
                <div key={index} className={styles.games_details}>
                    <div className={styles.games_infos_wrapper}>
                        <div className={styles.games_infos}>
                            {game.date && <span>{game.date}</span>}
                            {game.place && <span>{game.place}</span>}
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
                        {game.scores?.map((score, index) => (
                            <div key={index} className={styles.player_details}>
                                {score.player.picture ?
                                    <img src={score.player.picture}
                                         alt={`image de ${score.player.name}`}
                                    />
                                    :
                                    <img src={defaultAvatar}
                                         alt={`image de ${score.player.name}`}
                                    />
                                }
                                <span>{score.player.name}</span>
                                <span>{score.score}</span>
                            </div>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    )
}
