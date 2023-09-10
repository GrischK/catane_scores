import React, {useEffect, useState} from "react";
import styles from './NewGame.module.css';
import {Alert, Autocomplete, Button, Snackbar, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
    useCreateGameMutation, User,
    useUsersByNamesQuery,
    useUsersQuery
} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";

interface UserId {
    id: number;
}

interface GameInterface {
    date?: string | null;
    place?: string | null;
    players: UserId[];
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

    const {data} = useUsersQuery();
    const userNames = (data?.users || []).map((user) => user.name);

    const [createNewGame] = useCreateGameMutation();

    const onClickCreateNewGame = async () => {
        const isGameNotFilledWithPlayers =
            newGame.players.length < 2;
        if (isGameNotFilledWithPlayers) {
            setOpen(true)
            setErrorMessage("Sélectionne au moins 2 joueurs");
            return;
        }

        const playerIds = newGame.players
            .map((player) => {
                const user = data?.users.find((user) => user.name === String(player.id));
                return user ? { id: user.id } : null;
            })
            .filter((id) => id !== null) as UserId[];

        console.log(playerIds);

        try {
            await createNewGame({
                variables: {
                    data: {
                        date: newGame.date,
                        place: newGame.place,
                        players: playerIds,
                    },
                },
            });
            setSuccessOpen(true)
            setSuccessMessage("Partie créée");
            setNewGame({
                date: "",
                place: "",
                players: [],
            });
        } catch (error) {
            console.error("Erreur lors de la création de la partie :", error);
        }
    };

    const {data: userData} = useUsersByNamesQuery({
        variables: {
            names: newGame.players.map((player) => String(player.id)),
        },
        skip: newGame.players.length === 0,
    });

    useEffect(() => {
        if (userData) {
            setGamePlayers(userData.usersByNames || []);
        } else {
            setGamePlayers([]);
        }
    }, [userData, newGame.players]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setSuccessOpen(false)
    };

    return (
        <div className={styles.new_game_container}>
            <h1>Ajouter une partie</h1>
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
                getOptionLabel={(userName) => userName}
                value={newGame.players.map((user) => String(user.id))}
                onChange={(_, newValue) => {
                    const selectedUserObjects = newValue.map((id) => ({ id } as unknown as UserId));
                    setNewGame((prevState) => ({
                        ...prevState,
                        players: newValue.length === 0 ? [] : selectedUserObjects,
                    }));
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Joueurs" variant="outlined"/>
                )}
            />
            <Button variant="contained" onClick={onClickCreateNewGame} endIcon={<SendIcon/>}>
                Ajouter
            </Button>
            {gamePlayers && (gamePlayers.map(e =>
                <div className={styles.new_game_players_list}>
                    <h1>{e.name}</h1>
                    {e.picture ? (
                        <img src={e.picture} alt={`image de ${e.name}`}/>
                    ) : (
                        <img src={defaultAvatar} alt="user picture"/>
                    )
                    }
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
