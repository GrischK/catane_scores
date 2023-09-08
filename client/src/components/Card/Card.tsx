import styles from './Card.module.css';
import defaultAvatar from '../../assets/images/default_avatar.png';

interface CardProps {
    playerName: string,
    playerAvatar: string | null | undefined,
}

export default function Card({playerName, playerAvatar}: CardProps) {
    return (
        <div className={styles.card}>
            <h1>{playerName}</h1>
            <div className={styles.card_image_wrapper}>
                {playerAvatar ? <img src={playerAvatar} alt="user picture"/> : <img src={defaultAvatar} alt="user picture"/>}
            </div>
        </div>
    )
}
