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
import MysteriousText from "../../components/MysteriousText";
import {motion} from "framer-motion";

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

    const [mysteriousTextIsShown, setMysteriousTextIsShown] = useState(false);
    const [mysteriousTextStep2IsShown, setMysteriousTextStep2IsShown] = useState(false)

    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])
    const [step, setStep] = useState(1)

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

        if (step === 1) {
            setMysteriousTextIsShown(true)
        }

        if (step === 2) {
            setMysteriousTextStep2IsShown(true)
        }

    }, [gamesData, step]);

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

    console.log(mysteriousTextStep2IsShown)

    return (
        <>
            {step === 1 &&
                (
                    <div className={styles.players_list_container} id="players_list">
                        {loading ?
                            <Box sx={{display: 'flex', alignItem: 'center', height: '100vh', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </Box>
                            :
                            <>
                                {mysteriousTextIsShown &&
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
                                            Liste des Cataneurs
                                        </MysteriousText>
                                    </motion.h1>
                                }
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
                                <button
                                    onClick={() => setStep(prevState => prevState + 1)}
                                >
                                    Ajouter un Cataneur
                                </button>
                                {errorMessage &&
                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                                            {errorMessage}
                                        </Alert>
                                    </Snackbar>
                                }
                            </>
                        }
                    </div>
                )
            }
            {step === 2 &&
                (
                    <div className={styles.add_player_container}>
                        {mysteriousTextStep2IsShown && (

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
                                    Liste des Cataneurs
                                </MysteriousText>
                            </motion.h1>)
                        } <TextField
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
                        <button
                            onClick={() => setStep(prevState => prevState - 1)}
                        >
                            Liste des Cataneurs
                        </button>
                    </div>
                )
            }
        </>
    )
}
