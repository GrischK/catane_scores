import styles from './NewRanding.module.css';
import {useEffect, useState} from "react";
import MysteriousText from "../../components/MysteriousText";

export default function NewRanking() {
    const [thirdPlayerIsShown, setThirdPlayerIsShown] = useState(false)
    const [moveThirdPlayer, setMoveThirdPlayer] = useState(false)
    const [thirdPlayerNameIsShown, setThirdPlayerNameIsShown] = useState(false)

    const [secondPlayerIsShown, setSecondPlayerIsShown] = useState(false)
    const [moveSecondPlayer, setMoveSecondPlayer] = useState(false)
    const [secondPlayerNameIsShown, setSecondPlayerNameIsShown] = useState(false)

    const [firstPlayerIsShown, setFirstPlayerIsShown] = useState(false)
    const [moveFirstPlayer, setMoveFirstPlayer] = useState(false)
    const [firstPlayerNameIsShown, setFirstPlayerNameIsShown] = useState(false)

    const [darkBackground, setDarkBackground] = useState(false)
    const [spotLight, setSpotLight] = useState(false);

    useEffect(() => {
        const timers: any[] = [];

        const thirdPlayerTimer = setTimeout(() => {
            setThirdPlayerIsShown(true)
        }, 1000);
        const thirdPlayerNameTimer = setTimeout(() => {
            setThirdPlayerNameIsShown(true)
        }, 3000);
        const moveThirdPlayerTimer = setTimeout(() => {
            setMoveThirdPlayer(true)
        }, 5000);

        timers.push(thirdPlayerTimer, moveThirdPlayerTimer, thirdPlayerNameTimer);

        const secondPlayerTimer = setTimeout(() => {
            setSecondPlayerIsShown(true)
        }, 5000);
        const secondPlayerNameTimer = setTimeout(() => {
            setSecondPlayerNameIsShown(true)
        }, 7000);
        const moveSecondPlayerTimer = setTimeout(() => {
            setMoveSecondPlayer(true)
        }, 9000);

        const firstPlayerTimer = setTimeout(() => {
            setFirstPlayerIsShown(true)
        }, 9000);
        const firstPlayerNameTimer = setTimeout(() => {
            setFirstPlayerNameIsShown(true)
        }, 11000);
        const moveFirstPlayerTimer = setTimeout(() => {
            setMoveFirstPlayer(true)
        }, 13000);
        timers.push(firstPlayerTimer, moveFirstPlayerTimer, firstPlayerNameTimer);

        const darkBackground = setTimeout(() => {
            setDarkBackground(true)
        }, 10000);
        const light = setTimeout(() => {
            setSpotLight(true);
        }, 13000);
        timers.push(secondPlayerTimer, moveSecondPlayerTimer, secondPlayerNameTimer, light);

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            setSpotLight(false)
        }
    }, []);

    console.log(spotLight)

    return (
        <div className={styles.newRanking_container}>
            <div
                className={`${styles.thirdPlayer} ${thirdPlayerIsShown ? styles.appear : ''} ${moveThirdPlayer ? styles.move : ''}`}>
                <span>3</span>
                <div className={`${styles.playerName} ${thirdPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                    Mymy
                </div>
            </div>
            <div
                className={`${styles.secondPlayer} ${secondPlayerIsShown ? styles.appear : ''} ${moveSecondPlayer ? styles.move : ''}`}>
                <span>2</span>
                <div className={`${styles.playerName} ${secondPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                    Leila
                </div>
            </div>
            <div
                className={`${styles.firstPlayer} ${firstPlayerIsShown ? styles.appear : ''} ${moveFirstPlayer ? styles.move : ''}`}>
                <span>1</span>
                <div className={`${styles.playerName} ${firstPlayerNameIsShown ? styles.playerNameIsShown : ''}`}>
                    Mechmech
                </div>
            </div>
            <div className={`${styles.lightCircleOff} ${darkBackground ? styles.lightCircleOn : ''}`}>
            </div>
        </div>
    )
}