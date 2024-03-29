import React, {MouseEventHandler, useEffect, useState} from "react";
import {PlayerInterface, PlayersPoints} from "../../interfaces/playersListPage.interface";
import styles from './PlayersList.module.css';
import {
    useCreateUserMutation,
    useDeleteUserMutation, useGamesQuery,
    useUsersQuery
} from "../../gql/generated/schema";
import Card from "../../components/Card/Card";
import RandomAvatar from "../../components/RandomAvatar/RandomAvatar";
import CircularProgress from '@mui/material/CircularProgress';
import MysteriousText from "../../components/MysteriousText";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import ColoredInput from "../../components/ColoredInput/ColoredInput";
import {ThemeProvider} from '@mui/material/styles';
import {Alert, IconButton, Snackbar} from "@mui/material";
import {motion} from "framer-motion";
import ArrowLeft from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import {buttonTransition} from "../../utils/animationVariants";
import {blueTheme} from "../../utils/stylesVariantes";

export default function PlayersList() {
    const [newPlayerAvatar, setNewPlayerAvatar] = useState("");
    const [newPlayer, setNewPlayer] = useState<PlayerInterface>({
        name: "",
        picture: "",
    },)
    const [errorMessage, setErrorMessage] = useState(""); // État pour stocker le message d'erreur
    const [open, setOpen] = React.useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [isPlayerUpdated, setIsPlayerUpdated] = useState(false)
    const {data: gamesData} = useGamesQuery()

    const [mysteriousTextIsShown, setMysteriousTextIsShown] = useState(false);
    const [mysteriousTextStep2IsShown, setMysteriousTextStep2IsShown] = useState(false)

    const [playersPoints, setPlayersPoints] = useState<PlayersPoints[]>([])
    const [step, setStep] = useState(1)
    const {data, refetch, loading} = useUsersQuery();

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
                        updatedPlayersPoints[playerIndex].victoryCount += 1;
                    } else {
                        updatedPlayersPoints.push({
                            player: firstPlayer,
                            victoryCount: 1,
                        } as PlayersPoints);
                    }
                }
            });
            updatedPlayersPoints.sort((a, b) => b.victoryCount - a.victoryCount);

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

    const [createNewPlayer] = useCreateUserMutation({
        onCompleted: () => refetch()
    });

    const [deletePlayer] = useDeleteUserMutation({onCompleted: () => refetch()})

    const onClickCreateNewPlayer = () => {
        if (newPlayer.name.trim() !== "") { // Vérifie si le nom n'est pas vide ou composé uniquement d'espaces
            createNewPlayer({variables: {data: newPlayer}}).then(r => r.data);
            setNewPlayer({name: ""});
            setStep(1)
            setSuccessMessage("Nouveau Cataneur prêt à coloniser.");
            setSuccessOpen(true)
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
                    setSuccessMessage("Cataneur disparu. Que ses exploits Catanistiques restent gravés à jamais pour les générations futures !");
                    setSuccessOpen(true)
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
        setSuccessOpen(false);
    };

    return (
        <>
            {step === 1 &&
                (
                    <div
                        className={styles.players_list_container} id="players_list"
                    >
                        {loading ?
                            <Box
                                sx={{display: 'flex', alignItem: 'center', height: '100vh', justifyContent: 'center'}}
                            >
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
                                            Les Cataneurs fous
                                        </MysteriousText>
                                    </motion.h1>
                                }
                                <div
                                    className={styles.players_list}
                                >
                                    {data?.users.slice()
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((user, index) => {
                                            return (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        y: '100vh',
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.9,
                                                        ease: [0.17, 0.55, 0.55, 1],
                                                        delay: (index + 5) * 0.2,
                                                    }}
                                                    key={index}
                                                >
                                                    <Card
                                                        key={user.id}
                                                        playerName={user.name}
                                                        playerAvatar={user.picture}
                                                        gamesCounter={user.games?.length}
                                                        playerRank={(playersPoints.find((player) => player.player.name === user.name) || {}).victoryCount || 0}
                                                        userId={user.id}
                                                        onClickDeleteFunction={onClickDeletePlayer}
                                                        refreshPlayersList={refreshPlayersList}
                                                    />
                                                </motion.div>
                                            )
                                        })}
                                </div>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    transition={
                                        buttonTransition
                                    }
                                >
                                    <ColoredButton
                                        bgColor={'yellow'}
                                        onClick={() => setStep(prevState => prevState + 1)}
                                    >
                                        Ajouter un Cataneur
                                    </ColoredButton>
                                </motion.div>
                            </>
                        }

                        {errorMessage &&
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="error"
                                    sx={{
                                        width: '100%', borderRadius: '2vh',
                                        overflow: 'hidden',
                                        border: '3px solid black'
                                    }}>
                                    {errorMessage}
                                </Alert>
                            </Snackbar>
                        }
                    </div>
                )
            }
            {step === 2 &&
                (
                    <div
                        className={styles.add_player_container}
                    >
                        <div
                            className={styles.back_button}
                        >
                            <ThemeProvider
                                theme={blueTheme}
                            >
                                <IconButton
                                    color={'primary'}
                                    onClick={() => setStep(prevState => prevState - 1)}
                                >
                                    <ArrowLeft
                                        color={'primary'}
                                        fontSize={'medium'}
                                    />
                                </IconButton>
                            </ThemeProvider>
                        </div>
                        {mysteriousTextStep2IsShown &&
                            (
                                <motion.h1
                                    initial={{x: '-100vw'}}
                                    animate={{x: 1}}
                                    transition={
                                        {delay: 0.5}
                                    }
                                    className={styles.players_list_title}
                                >
                                    <MysteriousText
                                        colorsList={["#f04d4d", "#ffd903", "#5ba1fc", "#87BAFD", "#FFED85"]}
                                    >
                                        Nouveau Cataneur
                                    </MysteriousText>
                                </motion.h1>
                            )
                        }
                        <ColoredInput
                            label="nom"
                            bgColor={'blue'}
                            value={newPlayer.name}
                            onChange={(e) =>
                                setNewPlayer((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    })
                                )
                            }
                        />
                        <RandomAvatar
                            onChange={setNewPlayerAvatar}
                        />
                        <motion.div
                            whileHover={{scale: 1.05}}
                            transition={buttonTransition}
                        >
                            <ColoredButton
                                bgColor={'blue'}
                                onClick={onClickCreateNewPlayer}
                            >
                                Créer le Cataneur
                            </ColoredButton>
                        </motion.div>
                        {errorMessage &&
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="error"
                                    sx={{
                                        width: '100%', borderRadius: '2vh',
                                        overflow: 'hidden',
                                        border: '3px solid black'
                                    }}>
                                    {errorMessage}
                                </Alert>
                            </Snackbar>
                        }
                    </div>
                )
            }
            {successMessage &&
                <Snackbar
                    open={successOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{
                            width: '100%', borderRadius: '2vh',
                            overflow: 'hidden',
                            border: '3px solid black'
                        }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            }
        </>
    )
}
