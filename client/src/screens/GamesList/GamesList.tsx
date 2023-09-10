import React from "react";
import styles from './GamesList.module.css';
import {useGamesQuery} from "../../gql/generated/schema";
import defaultAvatar from "../../assets/images/default_avatar.png";

export default function GamesList() {

    const {data} = useGamesQuery()

    return (
        <div className={styles.games_list_container}>
            {data?.games.map(game => (
                <div style={{display: "flex", flexDirection: "column", marginBottom: "2vh", background:"white", width:"fit-content"}}>
                    <span>{game.id}</span>
                    {game.date && <p>{game.date}</p>}
                    {game.place && <p>{game.place}</p>}
                    {game.picture && <img src={game.picture} alt={`image du Catan du ${game.date}`}/>}
                    <div style={{display:'flex'}}>
                        {game.players.map(player => (
                            <div style={{display:'flex', flexDirection:"column"}}>
                                {player.picture ?
                                    <img style={{width: "60px", height: "60px"}} src={player.picture}
                                         alt={`image du Catan du ${game.date}`}/>
                                    :
                                    <img style={{width: "60px", height: "60px"}} src={defaultAvatar} alt="user picture"/>
                                }
                                <span>{player.name}</span>
                            </div>
                        ))}

                    </div>

                </div>
            ))}
        </div>
    )
}
