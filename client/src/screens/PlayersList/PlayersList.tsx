import React from "react";
import styles from './PlayersList.module.css';
import {useUsersQuery} from "../../gql/generated/schema";


export default function PlayersList() {
    const {data, error} = useUsersQuery();
    console.log(data, error)

    return (
        <div className={styles.players_list_container}>
            {data?.users.map((user, index) =>
                <h1 key={index}>{user.name}</h1>)
            }
        </div>
    )
}
