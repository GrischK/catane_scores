import styles from './Card.module.css';
import defaultAvatar from '../../assets/images/default_avatar.png';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {MouseEventHandler} from "react";

interface CardProps {
    playerName: string,
    playerAvatar: string | null | undefined,
    onClickFunction: MouseEventHandler<HTMLButtonElement>,
    userId: number,
}

export default function Card({playerName, playerAvatar, onClickFunction, userId}: CardProps) {
    return (
        <div className={styles.card}>
            <h1>{playerName}</h1>
            <div className={styles.card_image_wrapper}>
                {playerAvatar ? <img src={playerAvatar} alt="user picture"/> :
                    <img src={defaultAvatar} alt="user picture"/>}
            </div>
            <IconButton aria-label="delete" onClick={onClickFunction} data-player-id={userId}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
