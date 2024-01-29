import React, {useEffect, useRef, useState} from "react";
import styles from './NewGame.module.css';
import {
    Alert,
    Snackbar,
    TextField
} from "@mui/material";
import {
    useCreateGameWithScoresMutation, User, useUsersByIdsQuery,
    useUsersQuery
} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import ColoredInput from "../../components/ColoredInput/ColoredInput";

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
    const [open, setOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);

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
        document.addEventListener("click", handleClickOutside)
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
    };

    return (
        <div className={styles.new_game_container}>
            <h1 className={styles.title}>Ajouter une Catanerie</h1>
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
            <ColoredInput
                bgColor={"red"}
                label={"lieu"}
                value={newGame.place}
                onChange={(e) =>
                    setNewGame((prevState) => ({
                        ...prevState,
                        place: e.target.value,
                    }))
                }
            />
            <div ref={containerRef} className={styles.players_list_container}>
                <label
                    className={`${styles.players_list_label} ${showPlayersList ? `${styles.players_selected}` : ''} ${gamePlayers && gamePlayers?.length > 0 ? `${styles.players_selected}` : ''}`}
                    htmlFor="playersList" onClick={() => setShowPlayersList(true)}><span>Cataneurs</span>
                </label>
                {showPlayersList && <div>
                    {userNames.map((user) => (
                        <div key={user.id}>
                            <input
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
                </div>}
            </div>
            {gamePlayers && gamePlayers?.length > 0 &&
                <div className={styles.new_game_players}>
                    {gamePlayers &&
                        gamePlayers.map((e) => (
                            <div className={styles.new_game_players_list} key={e.id}>
                                <h1>{e.name}</h1>
                                {e.picture ? (
                                    <img src={e.picture} alt={`image de ${e.name}`}/>
                                ) : (
                                    <img src={defaultAvatar} alt="user picture"/>
                                )}
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
            <ColoredButton
                bgColor={"yellow"}
                onClick={onClickCreateNewGame}
            >
                Créer la partie
            </ColoredButton>
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
