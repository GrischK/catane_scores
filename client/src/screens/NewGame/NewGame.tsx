import React, {useEffect, useRef, useState} from "react";
import styles from './NewGame.module.css';
import {
    Alert,
    Snackbar
} from "@mui/material";
import {
    useCreateGameWithScoresMutation, User, useUsersByIdsQuery,
    useUsersQuery
} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import ColoredInput from "../../components/ColoredInput/ColoredInput";
import {AnimatePresence, motion} from "framer-motion";
import MysteriousText from "../../components/MysteriousText";

interface PlayerData {
    player: number;
    score: number;
}

interface GameInterface {
    date?: string | null;
    place?: string | null;
    playersData: PlayerData[];
}

export default function NewGame({refreshGamesList}: any) {
    const {data} = useUsersQuery();
    const [showPlayersList, setShowPlayersList] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [newGame, setNewGame] = useState<GameInterface>({
        date: "",
        place: "",
        playersData: [],
    },)

    const [gamePlayers, setGamePlayers] = useState<User[] | null>(null);
    const userNames = (data?.users || []).map((user) => user);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [mysteriousTextIsShown, setMysteriousTextIsShown] = React.useState(false);
    const [warningOpen, setWarningOpen] = React.useState(false);

    const [createNewGame] = useCreateGameWithScoresMutation();

    const onClickCreateNewGame = async () => {
        const isGameNotFilledWithPlayers = newGame.playersData.length < 2 || newGame.playersData.length > 6;
        if (isGameNotFilledWithPlayers) {
            setOpen(true);
            setErrorMessage("Sélectionne entre 2 à 6 joueurs");
            return;
        }

        const areAllScoresFilled = newGame.playersData.every((player) => player.score !== 0);

        if (!areAllScoresFilled) {
            setOpen(true);
            setErrorMessage("Indique le score pour chaque joueur");
            return;
        }
        try {
            await createNewGame({
                variables: {
                    data: {
                        date: newGame.date,
                        place: newGame.place,
                        playersData: newGame.playersData,
                    },
                },
            });
            console.log(newGame)
            setSuccessOpen(true);
            setSuccessMessage("Partie créée");
            refreshGamesList();
            setNewGame({
                date: "",
                place: "",
                playersData: [],
            });
        } catch (error) {
            console.error("Erreur lors de la création de la partie :", error);
        }
    };

    useEffect(() => {
    }, [newGame.playersData, newGame, containerRef, setShowPlayersList]);

    const {data: userData} = useUsersByIdsQuery({
        variables: {
            ids: newGame.playersData.map((player) => player.player),
        },
        skip: newGame.playersData.length === 0,
    });

    useEffect(() => {
        if (userData) {
            setGamePlayers(userData.usersByIds || []);
        } else {
            setGamePlayers([]);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowPlayersList(false)
            }
            console.log(event.target)
        }

        if (newGame.playersData.length >= 6) {
            setWarningOpen(true);
            setWarningMessage("Vous ne pouvez pas sélectionner plus de 6 joueurs");
            return;
        } else {
            setWarningOpen(false);
        }

        setTimeout(() => {
            setMysteriousTextIsShown(true)
        }, 450)

        document.addEventListener("click", handleClickOutside);

        return () => {
            console.log('coucou')
            document.removeEventListener("click", handleClickOutside);
        };

    }, [userData, newGame.playersData, newGame]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setSuccessOpen(false)
        setWarningOpen(false)
    };

    const buttonTransition = {
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
        }
    }

    const createGameButtonVariants = {
        hidden: {y: '100vh'},
        visible: {
            y: '5vh',
            transition: {
                delay: 1.5,
                duration: 1,
                type: "spring",
                stiffness: 55,
                damping: 9,
            }
        }
    }

    const inputVariants = {
        hidden: {opacity: 0, scale: 0.5},
        visible: {
            opacity: 1, scale: 1, transition: {
                duration: 0.7,
                delay: 1.4,
                ease: [0, 0.71, 0.2, 1.01]
            }
        }
    }

    return (
        <div className={styles.new_game_container}>
            <motion.h1
                initial={{x: '-100vw'}}
                animate={{x: 1}}
                transition={
                    {delay: 0.5}
                }
            >
                {mysteriousTextIsShown &&
                    <MysteriousText colorsList={["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]}>Ajouter une
                        Catanerie</MysteriousText>
                }
            </motion.h1>
            <div className={styles.input_container}>
                <motion.div
                    variants={inputVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <ColoredInput
                        bgColor={"blue"}
                        label={"date"}
                        value={newGame.date}
                        onChange={(e) =>
                            setNewGame((prevState) => ({
                                ...prevState,
                                date: e.target.value,
                            }))
                        }
                    />
                </motion.div>
                <motion.div
                    variants={inputVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <ColoredInput
                        bgColor={"yellow"}
                        label={"lieu"}
                        value={newGame.place}
                        onChange={(e) =>
                            setNewGame((prevState) => ({
                                ...prevState,
                                place: e.target.value,
                            }))
                        }
                    />
                </motion.div>
                <motion.div
                    variants={inputVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <div ref={containerRef} className={styles.players_list_container}>
                        <label
                            className={`${styles.players_list_label} ${showPlayersList ? `${styles.players_selected}` : ''} ${gamePlayers && gamePlayers?.length > 0 ? `${styles.players_selected}` : ''}`}
                            htmlFor="playersList"
                            onClick={() => setShowPlayersList(prevState => !prevState)}><span>Cataneurs</span>
                        </label>
                        <AnimatePresence>
                            {showPlayersList &&
                                <motion.div
                                    className={styles.choosePlayers}
                                    initial={{
                                        width: 0,
                                        height: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        width: 'calc(100% - 2rem)',
                                        height: 'fit-content',
                                        opacity: 1
                                    }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0,
                                        duration: 0.4
                                    }}
                                    exit={{
                                        width: 0,
                                        height: 0,
                                        opacity: 0,
                                        marginTop: 0,
                                        padding: 0
                                    }}
                                >
                                    {userNames.map((user) => (
                                        <div key={user.id}>
                                            <input
                                                disabled={newGame.playersData.length >= 6 && !newGame.playersData.some((player) => player.player === user.id)}
                                                className={styles.players_check_input}
                                                type="checkbox"
                                                id={`playerCheckbox-${user.id}`}
                                                value={user.name}
                                                checked={newGame.playersData.some((player) => player.player === user.id)}
                                                onChange={(event) => {
                                                    const isChecked = event.target.checked;
                                                    setNewGame((prevState) => ({
                                                        ...prevState,
                                                        playersData: isChecked
                                                            ? [
                                                                ...prevState.playersData,
                                                                {
                                                                    player: user.id,
                                                                    score: prevState.playersData.find((player) => player.player === user.id)?.score || 0,
                                                                },
                                                            ]
                                                            : prevState.playersData.filter((player) => player.player !== user.id),
                                                    }));
                                                }}
                                            />
                                            <label htmlFor={`playerCheckbox-${user.id}`}>{user.name}</label>
                                        </div>
                                    ))}
                                </motion.div>}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            {gamePlayers && gamePlayers?.length > 0 &&
                <div className={styles.new_game_players}>
                    {gamePlayers &&
                        gamePlayers.map((e) => (
                            <div className={styles.new_game_players_item} key={e.id}>
                                <div className={styles.avatar_container}>
                                    {e.picture ? (
                                        <img src={e.picture} alt={`image de ${e.name}`}/>
                                    ) : (
                                        <img src={defaultAvatar} alt="user picture"/>
                                    )}
                                    <div className={styles.avatar_title}>
                                        <h1>{e.name}</h1>
                                    </div>
                                </div>
                                <ColoredInput
                                    bgColor={"yellow"}
                                    label={"score"}
                                    value={newGame.playersData.find(player => player.player === e.id)?.score || ""}
                                    onChange={(event) => {
                                        const score = event.target.value;
                                        setNewGame((prevState) => ({
                                            ...prevState,
                                            playersData: prevState.playersData.map(player => {
                                                if (player.player === e.id) {
                                                    return {...player, score: score === "" ? 0 : parseInt(score, 10)};
                                                } else {
                                                    return player;
                                                }
                                            }),
                                        }));
                                    }}
                                />
                            </div>
                        ))}
                </div>
            }
            <motion.div
                variants={createGameButtonVariants}
                initial='hidden'
                animate='visible'
                whileHover={{scale: 1.05}}
                transition={buttonTransition}
            >
                <ColoredButton
                    bgColor={"red"}
                    onClick={onClickCreateNewGame}
                >
                    Créer le Catanage
                </ColoredButton>
            </motion.div>
            {errorMessage &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            }
            {successMessage &&
                <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            }
            {warningMessage &&
                <Snackbar open={warningOpen} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{width: '100%'}}>
                        {warningMessage}
                    </Alert>
                </Snackbar>
            }
        </div>
    )
}
