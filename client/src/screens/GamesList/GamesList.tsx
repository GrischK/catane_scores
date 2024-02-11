import React, {MouseEventHandler, useEffect} from "react";
import styles from './GamesList.module.css';
import {useDeleteGameMutation, useGamesQuery} from "../../gql/generated/schema";
import {motion} from "framer-motion";
import MysteriousText from "../../components/MysteriousText";
import Pagination from "../../components/Pagination/Pagination";

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
            <motion.h1
                initial={{x: '-100vw'}}
                animate={{x: 1}}
                transition={
                    {delay: 0.5}
                }
                className={styles.players_list_title}
            >
                <MysteriousText
                    colorsList={["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]}
                >
                    Liste des Cataneries
                </MysteriousText>
            </motion.h1>
            <Pagination
                length={classedGames?.length}
                postsPerPage={20}
                games={classedGames}
                onClickDeleteGame={onClickDeleteGame}
            />
        </div>
    )
}