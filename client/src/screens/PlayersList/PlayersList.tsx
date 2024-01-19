import React, {MouseEventHandler, useEffect, useState} from "react";
import styles from './PlayersList.module.css';
import {
    useCreateUserMutation,
    useDeleteUserMutation, useGamesQuery, User,
    useUsersQuery
} from "../../gql/generated/schema";
import {Alert, Button, Snackbar, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Card from "../../components/Card/Card";
import RandomAvatar from "../../components/RandomAvatar/RandomAvatar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface PlayerInterface {
    name: string;
    picture?: string | null;
}

interface PlayersPoints {
    player: User;
    playerTotalPoints: number;
}

export default function PlayersList() {
    const [newPlayerAvatar, setNewPlayerAvatar] = useState("");
    const [newPlayer, setNewPlayer] = useState<PlayerInterface>({
        name: "",
        picture: "",
    },)
    const [errorMessage, setErrorMessage] = useState(""); // État pour stocker le message d'erreur
    const [open, setOpen] = React.useState(false);
    const [isPlayerUpdated, setIsPlayerUpdated] = useState(false)
    const {data: gamesData} = useGamesQuery()

    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])

    useEffect(() => {
        if (gamesData) {
            const updatedPlayersPoints: PlayersPoints[] = [];
            gamesData.games.forEach((game) => {
                if (game.scores && game.scores.length > 0) {
                    const sortedScores = [...game.scores];
                    sortedScores.sort((a, b) => b.score - a.score);
                    const firstPlayer = sortedScores[0].player;

                    const playerIndex = updatedPlayersPoints.findIndex(
                        (p) => p.player?.name === firstPlayer.name
                    );

                    if (playerIndex !== -1) {
                        updatedPlayersPoints[playerIndex].playerTotalPoints += 1;
                    } else {
                        updatedPlayersPoints.push({
                            player: firstPlayer,
                            playerTotalPoints: 1,
                        } as PlayersPoints);
                    }
                }
            });
            updatedPlayersPoints.sort((a, b) => b.playerTotalPoints - a.playerTotalPoints);

            setPlayersPoints(updatedPlayersPoints);
        }
    }, [gamesData]);

    useEffect(() => {
        setNewPlayer((prevState) => ({...prevState, picture: newPlayerAvatar || ""}));
    }, [newPlayerAvatar]);

    useEffect(() => {
        refetch()
        setIsPlayerUpdated(false)
    }, [isPlayerUpdated]);

    const refreshPlayersList = () => {
        setIsPlayerUpdated(true)
    };

    const {data, refetch, loading} = useUsersQuery();

    const [createNewPlayer] = useCreateUserMutation({
        onCompleted: () => refetch()
    });

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

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={styles.players_list_container} id="players_list">
            {loading ?
                <Box sx={{display: 'flex', alignItem: 'center', height: '100vh', justifyContent:'center'}}>
                    <CircularProgress/>
                </Box>
                :
                <>
                    <h1 className={styles.title}>Liste des Cataneurs</h1>
                    <div className={styles.players_list}>
                        {data?.users.slice()
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((user, index) => {
                                return (
                                    <Card
                                        key={index}
                                        playerName={user.name}
                                        playerAvatar={user.picture}
                                        gamesCounter={user.games?.length}
                                        playerRank={(playersPoints.find((player) => player.player.name === user.name) || {}).playerTotalPoints || 0}
                                        userId={user.id}
                                        onClickDeleteFunction={onClickDeletePlayer}
                                        refreshPlayersList={refreshPlayersList}
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
                        <TextField
                            required={true}
                            className={styles.new_player_input}
                            label="Nom du Cataneur"
                            type="text"
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
                    </div>
                </>
            }
        </div>
    )
}
