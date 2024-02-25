import React, {useEffect, useState} from "react";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import MysteriousText from "../../components/MysteriousText/MysteriousText";
import styles from './HomePage.module.css';
import {ReactComponent as Crown} from "../../assets/images/crown.svg"
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion"
import {buttonTransition, crownTransition} from "../../utils/animationVariants";

export default function HomePage() {
    const [control1, setControl1] = useState(false);
    const [control2, setControl2] = useState(false);
    const [control3, setControl3] = useState(false);
    const [displayText, setDisplayText] = useState(false)

    useEffect(() => {
        const timers: any[] = [];
        const button1Timer = setTimeout(() => {
            setControl1(true)
        }, 500);
        const button2Timer = setTimeout(() => {
            setControl2(true)
        }, 700);
        const button3Timer = setTimeout(() => {
            setControl3(true)
        }, 900);
        const titleTimer = setTimeout(() => {
            setDisplayText(true)
        }, 2000);

        timers.push(button1Timer, button2Timer, button3Timer, titleTimer)

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, []);

    return (
        <div
            className={styles.home_page_container}
        >
            <div
                className={styles.mysterious_text_container}
            >
                {displayText &&
                    <h1>
                        <MysteriousText
                            colorsList={["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]}
                        >
                            Les Cataneurs Fous
                        </MysteriousText>
                    </h1>

                }
            </div>
            <div
                className={styles.button_container}
            >
                <motion.div
                    className={styles.animated_button}
                    whileHover={{scale: 1.05}}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>
                    <NavLink
                        to="/new_game"
                    >
                        <ColoredButton
                            bgColor={'red'}
                        >
                            Nouvelle partie
                        </ColoredButton>
                    </NavLink>
                </motion.div>
                {control1 && (
                    <motion.div
                        className={styles.animated_button}
                        whileHover={{scale: 1.05}}
                        initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}}
                        transition={buttonTransition}
                    >
                        <NavLink
                            to="/ranking"
                        >
                            <ColoredButton
                                bgColor={'blue'}
                                style={{position: "relative"}}
                            >
                                Classement
                            </ColoredButton>
                            <motion.div
                                style={{position: "absolute"}}
                                initial={{opacity: 0, top: '-100vh', right: -3}}
                                animate={{opacity: 1, top: -24, right: -3}}
                                transition={
                                    crownTransition
                                }
                            >
                                <Crown
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        zIndex: "1000",
                                        rotate: "30deg",
                                        fill: "#ffd903"
                                    }}
                                />
                            </motion.div>
                        </NavLink>
                    </motion.div>)}
                {control2 && (
                    <motion.div
                        className={styles.animated_button}
                        whileHover={{scale: 1.05}}
                        initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}}
                        transition={buttonTransition}
                    >
                        <NavLink
                            to="/games_list"
                        >
                            <ColoredButton
                                bgColor={'green'}
                            >
                                Parties
                            </ColoredButton>
                        </NavLink>
                    </motion.div>)
                }
                {control3 && (
                    <motion.div
                        className={styles.animated_button}
                        whileHover={{scale: 1.05}}
                        initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}}
                        transition={buttonTransition}
                    >
                        <NavLink
                            to="/players_list"
                        >
                            <ColoredButton
                                bgColor={'yellow'}
                            >
                                Cataneurs
                            </ColoredButton>
                        </NavLink>
                    </motion.div>)
                }
            </div>
        </div>
    )
}
