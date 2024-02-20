import React, {MouseEventHandler, useEffect, useState} from "react";
import styles from './GamesList.module.css';
import {useDeleteGameMutation, useGamesQuery} from "../../gql/generated/schema";
import {motion} from "framer-motion";
import MysteriousText from "../../components/MysteriousText";
import Pagination from "../../components/Pagination/Pagination";
import {Alert, Snackbar} from "@mui/material";

export default function GamesList({gamesListRefreshed}: any) {
    const {data, refetch} = useGamesQuery()
    const [successMessage, setSuccessMessage] = useState("");
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorOpen, setErrorOpen] = React.useState(false);

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

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
        setSuccessOpen(false)
    };

    const [deleteGame] = useDeleteGameMutation({onCompleted: () => refetch()})

    const onClickDeleteGame: MouseEventHandler<HTMLButtonElement> = (event) => {
        const gameId = event.currentTarget.getAttribute("data-game-id");
        if (gameId) {
            try {
                deleteGame({variables: {deleteGameId: parseInt(gameId)}})
                    .then(({data}) => {
                        refetch();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                setSuccessMessage("Tu as effacé la partie vieux filou !")
                setSuccessOpen(true)
            } catch (error) {
                setErrorMessage("Erreur dans la suppression")
                setErrorOpen(true)
            }
        }
    };

    return (
        <div className={styles.games_list_wrapper}>
            <motion.h1
                initial={{x: '-100vw'}}
                animate={{x: 1}}
                transition={
                    {delay: 1.5}
                }
                className={styles.players_list_title}
            >
                <MysteriousText
                    colorsList={["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]}
                >
                    Les joutes Catanistiques
                </MysteriousText>
            </motion.h1>
            <Pagination
                length={classedGames?.length}
                postsPerPage={10}
                games={classedGames}
                onClickDeleteGame={onClickDeleteGame}
            />
            {successMessage &&
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            }
            {errorMessage &&
                <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            }
        </div>
    )
}