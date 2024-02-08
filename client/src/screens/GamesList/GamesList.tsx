import React, {MouseEventHandler, useEffect} from "react";
import styles from './GamesList.module.css';
import {useDeleteGameMutation, useGamesQuery} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GameAccordion from "../../components/GameAccordion/GameAccordion";

export default function GamesList({gamesListRefreshed}: any) {
    const {data, refetch} = useGamesQuery()

    useEffect(() => {
        refetch()
    }, [gamesListRefreshed, data]);

    const sortedGames = data?.games.slice().sort((a, b) => b.id - a.id);

    const classedGames = sortedGames?.map((game) => {
        if (game.scores) {
            const sortedScores = [...game.scores];
            sortedScores.sort((a, b) => b.score - a.score);
            return {...game, scores: sortedScores};
        } else {
            return game;
        }
    });

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
        <div className={styles.games_list_wrapper}>
            <h1 className={styles.title}>Liste des parties</h1>
            <div className={styles.games_list_container}>
                {classedGames?.map((game, index) => (
                        <GameAccordion game={game} key={index} index={index}/>
                    )
                )
                }
            </div>
        </div>
    )
}
