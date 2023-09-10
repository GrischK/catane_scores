    import React, {useState} from "react";
    import styles from './NewGame.module.css';
    import RandomAvatar from "../../components/RandomAvatar/RandomAvatar";
    import {Autocomplete, Button, TextField} from "@mui/material";
    import SendIcon from "@mui/icons-material/Send";
    import {useCreateGameMutation, User, useUsersQuery} from "../../gql/generated/schema";

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

        console.log(newGame)

        const {data} = useUsersQuery();
        const userNames = (data?.users || []).map((user) => user.name);

        const [createNewGame] = useCreateGameMutation();

        const onClickCreateNewGame = async () => {
            if (newGame.players.length >= 2) {
                const playerIds = newGame.players.map((playerName) => {
                    // @ts-ignore
                    const player = data?.users.find((user) => user.name === playerName);
                    return player ? player.id : null;
                });

                const filteredPlayerIds = playerIds.filter((id) => id !== null);

                try {
                    await createNewGame({
                        variables: {
                            data: {
                                date: newGame.date,
                                place: newGame.place,
                                players: filteredPlayerIds.map((id) => ({ id } as UserId)),
                            },
                        },
                    });
                    console.log("Partie créée");
                    setNewGame({
                        date: "",
                        place: "",
                        players: [],
                    });
                } catch (error) {
                    console.error("Erreur lors de la création de la partie :", error);
                }
            }else{
                console.error("Sélectionne au moins 2 joueurs");
            }
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
                        const selectedUserObjects = newValue.map((id) => ({id} as unknown as UserId));
                        setNewGame((prevState) => ({
                            ...prevState,
                            players: selectedUserObjects,
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Joueurs" variant="outlined"/>
                    )}
                />
                <Button variant="contained" onClick={onClickCreateNewGame} endIcon={<SendIcon/>}>
                    Ajouter
                </Button>
            </div>
        )
    }
