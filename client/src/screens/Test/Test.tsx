import styles from "../Test/Test.module.css"
import GameAccordion from "../../components/GameAccordion/GameAccordion";
import {Game, useDeleteGameMutation, useGamesQuery} from "../../gql/generated/schema";
import GameCard from "../../components/GameCard/GameCard";
import {MouseEventHandler} from "react";

export default function Test() {
    const {data, refetch} = useGamesQuery()

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

    const [deleteGame] = useDeleteGameMutation({onCompleted: () => refetch()})

    const onClickDeleteGame: MouseEventHandler<HTMLButtonElement> = (event) => {
        const gameId = event.currentTarget.getAttribute("data-game-id");
        if (gameId) {
            deleteGame({variables: {deleteGameId: parseInt(gameId)}})
                .then(({data}) => {
                    refetch();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    console.log(classedGames)

    return (
        <div className={styles.test_container}>
            {classedGames?.map((game, index) => (
                    <GameCard game={game} key={index} index={index} onClickDeleteFunction={onClickDeleteGame}/>
                )
            )
            }
        </div>
    )
}