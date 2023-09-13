import React, {useEffect, useState} from "react";
import styles from './NewGame.module.css';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Chip,
    MenuItem,
    OutlinedInput,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
    useCreateGameMutation, User, UserId,
    useUsersByNamesQuery,
    useUsersQuery
} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";

interface PlayerData {
    id: number;
    score: number;
}

interface GameInterface {
    date?: string | null;
    place?: string | null;
    players: PlayerData[];
}

export default function NewGame() {
    const [newGame, setNewGame] = useState<GameInterface>({
        date: "",
        place: "",
        players: [],
    },)

    const [gamePlayers, setGamePlayers] = useState<User[] | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [playerScores, setPlayerScores] = useState<{ [playerId: number]: number }>({});

    const {data} = useUsersQuery();
    const userNames = (data?.users || []).map((user) => user);

    const [createNewGame] = useCreateGameMutation();
    console.log(newGame)

    const onClickCreateNewGame = async () => {
        const isGameNotFilledWithPlayers = newGame.players.length < 2;
        if (isGameNotFilledWithPlayers) {
            setOpen(true);
            setErrorMessage("Sélectionne au moins 2 joueurs");
            return;
        }

        // const playerIds = newGame.players.map((player) => ({
        //     id: player.id,
        //     score: playerScores[player.id] || 0, // Utilise le score du joueur ou 0 par défaut
        // }));

        const playerIds = newGame.players
            .map((player) => {
                const user = data?.users.find((user) => user.name === String(player.id));
                return user ? { id: user.id } : null;
            })
            .filter((player) => player !== null) as UserId[];

        try {
            await createNewGame({
                variables: {
                    data: {
                        date: newGame.date,
                        place: newGame.place,
                        players: playerIds, // Utilise le tableau de joueurs avec leurs scores
                    },
                },
            });
            setSuccessOpen(true);
            setSuccessMessage("Partie créée");
            setNewGame({
                date: "",
                place: "",
                players: [],
            });
            setPlayerScores({}); // Réinitialise les scores après la création de la partie
        } catch (error) {
            console.error("Erreur lors de la création de la partie :", error);
        }
    };


    // const {data: userData} = useUsersByNamesQuery({
    //     variables: {
    //         names: newGame.players.map((player) => player.id),
    //     },
    //     skip: newGame.players.length === 0,
    // });
    //
    // useEffect(() => {
    //     if (userData) {
    //         setGamePlayers(userData.usersByNames || []);
    //     } else {
    //         setGamePlayers([]);
    //     }
    // }, [userData, newGame.players]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setSuccessOpen(false)
    };

    return (
        <div className={styles.new_game_container}>
            <h1 className={styles.title}>Ajouter une partie</h1>
            <TextField
                className={styles.new_game_input}
                label="Date"
                type="text"
                value={newGame.date}
                onChange={(e) =>
                    setNewGame((prevState) => ({
                        ...prevState,
                        date: e.target.value,
                    }))
                }
            />
            <TextField
                className={styles.new_game_input}
                label="Place"
                type="text"
                value={newGame.place}
                onChange={(e) =>
                    setNewGame((prevState) => ({
                        ...prevState,
                        place: e.target.value,
                    }))
                }
            />
            <Autocomplete
                multiple
                className={styles.new_game_multiselect}
                id="players"
                options={userNames}
                getOptionLabel={(option) => (option ? option.name : "")}
                value={newGame.players.map((userId) => {
                    const user = userNames.find((user) => user.id === userId.id);
                    return user || null;
                })}
                onChange={(_, newValue) => {
                    const selectedUserIds = newValue.map((user) => user?.id).filter((id) => id !== null && id !== undefined);
                    setNewGame((prevState) => ({
                        ...prevState,
                        players: newValue.length === 0 ? [] : selectedUserIds.map((id) => ({
                            id: typeof id === "number" ? id : 0, // Convertit id en nombre ou 0 par défaut si id n'est pas un nombre
                            score: id !== undefined ? playerScores[id] || 0 : 0, // Utilise le score du joueur ou 0 par défaut si id est défini
                        })),
                    }));
                }}

                renderInput={(params) => (
                    <TextField {...params} label="Joueurs" variant="outlined"/>
                )}
            />

            {/*<Select*/}
            {/*    labelId="demo-multiple-chip-label"*/}
            {/*    id="demo-multiple-chip"*/}
            {/*    multiple*/}
            {/*    value={newGame.players.map((user) => String(user.id))}*/}
            {/*    onChange={(event) => {*/}
            {/*        const newValue = event.target.value as string[];*/}
            {/*        const selectedUserObjects = newValue.map((id) => ({id} as unknown as UserId));*/}
            {/*        setNewGame((prevState) => ({*/}
            {/*            ...prevState,*/}
            {/*            players: newValue.length === 0 ? [] : selectedUserObjects,*/}
            {/*        }));*/}
            {/*    }}*/}
            {/*    MenuProps={{disableScrollLock: true}}*/}
            {/*    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}*/}
            {/*    renderValue={(selected) => (*/}
            {/*        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>*/}
            {/*            {selected.map((value) => (*/}
            {/*                <Chip key={value} label={value}/>*/}
            {/*            ))}*/}
            {/*        </Box>*/}
            {/*    )}*/}
            {/*>*/}
            {/*    {userNames.map((name) => (*/}
            {/*        <MenuItem*/}
            {/*            key={name}*/}
            {/*            value={name}*/}
            {/*        >*/}
            {/*            {name}*/}
            {/*        </MenuItem>*/}
            {/*    ))}*/}
            {/*</Select>*/}

            <Button variant="contained" onClick={onClickCreateNewGame} endIcon={<SendIcon/>}>
                Ajouter
            </Button>
            {gamePlayers &&
                gamePlayers.map((e) => (
                    <div className={styles.new_game_players_list} key={e.id}>
                        <h1>{e.name}</h1>
                        {e.picture ? (
                            <img src={e.picture} alt={`image de ${e.name}`} />
                        ) : (
                            <img src={defaultAvatar} alt="user picture" />
                        )}
                        <TextField
                            className={styles.new_game_input}
                            label="Score"
                            type="text"
                            value={playerScores[e.id] || ""}
                            onChange={(event) => {
                                const score = event.target.value;
                                setPlayerScores((prevScores) => ({
                                    ...prevScores,
                                    [e.id]: score === "" ? 0 : parseInt(score, 10),
                                }));
                            }}
                        />
                    </div>
                ))}
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
        </div>
    )
}
