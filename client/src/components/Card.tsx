import styles from './Card.module.css';
import userPic from '../assets/images/grisch.jpg';

export default function Card({playerName}:any) {
    return (
        <div className={styles.card}>
            <h1>{playerName}</h1>
            <div className={styles.card_image_wrapper}>
                <img src={userPic} alt="user picture"/>
            </div>
        </div>
    )
}
