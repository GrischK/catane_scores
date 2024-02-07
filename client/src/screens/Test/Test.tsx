import styles from "../Test/Test.module.css"
import GameAccordion from "../../components/GameAccordion/GameAccordion";
import {Game, useGamesQuery} from "../../gql/generated/schema";

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

    console.log(classedGames)

    return (
        <div className={styles.test_container}>
            {classedGames?.map((game, index) => (
                    <GameAccordion game={game} key={index} index={index}/>
                )
            )
            }
        </div>
    )
}