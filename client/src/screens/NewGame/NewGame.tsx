import React, {useEffect, useRef, useState} from "react";
import {GameInterface} from "../../interfaces/newGamePage.interface";
import {
    useCreateGameWithScoresMutation, User, useUsersByIdsQuery,
    useUsersQuery
} from "../../gql/generated/schema";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import ColoredInput from "../../components/ColoredInput/ColoredInput";
import MysteriousText from "../../components/MysteriousText";
import {
    Alert, Box, Modal,
    Snackbar, Typography
} from "@mui/material";
import {motion} from "framer-motion";
import {buttonTransition, createGameButtonVariants, inputVariants} from "../../utils/animationVariants";
import {newGameModalStyle} from "../../utils/stylesVariantes";
import CloseIcon from "@mui/icons-material/Close";
import styles from './NewGame.module.css';
import defaultAvatar from "../../assets/images/default_avatar.png";

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
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);

    const [mysteriousTextIsShown, setMysteriousTextIsShown] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const [showNewGameForm, setShowNewGameForm] = useState(false)

    const [createNewGame] = useCreateGameWithScoresMutation();

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

        setTimeout(() => {
            setShowNewGameForm(true)
        }, 3000)

        document.addEventListener("click", handleClickOutside);

        return () => {
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

    const handleModal = () => {
        setShowPlayersList(prevState => !prevState)
        setOpenModal(true)
    }

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
                    <MysteriousText
                        colorsList={["#f04d4d", "#F58F8F", "#ffd903", "#FFED85", "#5ba1fc", "#87BAFD"]}
                    >Ajouter une
                        Catanerie
                    </MysteriousText>
                }
            </motion.h1>
            <div
                className={`${styles.form_container} ${showNewGameForm ? `${styles.form_container_appears}` : ''}`}
            >
                <div
                    className={styles.input_container}
                >
                    <motion.div
                        variants={inputVariants}
                        initial='hidden'
                        animate='visible'
                    >
                        <ColoredInput
                            bgColor={"blue"}
                            label={"date"}
                            type={'date'}
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
                        <div
                            ref={containerRef}
                            className={styles.players_list_container}
                        >
                            <label
                                htmlFor="playersList"
                                onClick={handleModal}>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    transition={buttonTransition}
                                >
                                    <ColoredButton
                                        bgColor={"yellow"}
                                        className={"players_button"}
                                    >
                                        Cataneurs
                                    </ColoredButton>
                                </motion.div>
                            </label>
                        </div>
                    </motion.div>
                </div>
                {gamePlayers && gamePlayers?.length > 0 &&
                    <div className={styles.new_game_players}>
                        {gamePlayers &&
                            gamePlayers.map((e) => (
                                <div
                                    className={styles.new_game_players_item}
                                    key={e.id}
                                >
                                    <div
                                        className={styles.avatar_container}
                                    >
                                        {e.picture
                                            ?
                                            (
                                                <img
                                                    src={e.picture}
                                                    alt={e.name}
                                                />
                                            )
                                            :
                                            (
                                                <img
                                                    src={defaultAvatar}
                                                    alt={e.name}
                                                />
                                            )}
                                        <div
                                            className={styles.avatar_title}
                                        >
                                            <h1>
                                                {e.name}
                                            </h1>
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
                                                        return {
                                                            ...player,
                                                            score: score === "" ? 0 : parseInt(score, 10)
                                                        };
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
                    className={styles.create_game_button}
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
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                className={styles.new_game_players_modal}
            >
                <Box
                    id={styles.update_player_modal}
                    sx={newGameModalStyle}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Choisis les Cataneurs qui s'affrontent :
                    </Typography>
                    <div
                        className={styles.modal_players_container}
                    >
                        {userNames.map((user) => (
                            <div
                                key={user.id}
                                className={styles.game_player_wrapper}
                            >
                                <label
                                    htmlFor={`playerCheckbox-${user.id}`}
                                    className={styles.game_player_input}
                                >
                                    {user.picture
                                        ?
                                        <img src={user.picture} alt={user.name}/>
                                        :
                                        <img src={defaultAvatar} alt={user.name}/>
                                    }
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
                                    {user.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <motion.div
                        whileHover={{scale: 1.05}}
                        transition={buttonTransition}
                    >
                        <ColoredButton
                            bgColor={'red'}
                            onClick={handleCloseModal}
                        >
                            OK
                        </ColoredButton>
                    </motion.div>
                    <div
                        className={styles.add_players_close_modal_icon}
                    >
                        <CloseIcon
                            onClick={handleCloseModal}
                        />
                    </div>
                </Box>
            </Modal>
            {errorMessage &&
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{width: '100%'}}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
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
                        sx={{width: '100%'}}
                    >
                        {successMessage}
                    </Alert>
                </Snackbar>
            }
            {warningMessage &&
                <Snackbar
                    open={warningOpen}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="warning" sx={{width: '100%'}}
                    >
                        {warningMessage}
                    </Alert>
                </Snackbar>
            }
        </div>
    )
}
