import React, {useEffect, useState} from "react";
import styles from './HomePage.module.css';
import {NavLink} from "react-router-dom";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import MysteriousText from "../../components/MysteriousText";
import {motion} from "framer-motion"
import {ReactComponent as Crown} from "../../assets/images/crown.svg"
import {buttonTransition, crownTransition} from "../../utils/animationVariants";

export default function HomePage() {
    const [control1, setControl1] = useState(false);
    const [control2, setControl2] = useState(false);
    const [control3, setControl3] = useState(false);
    const [displayText, setDisplayText] = useState(false)



    useEffect(() => {
        setTimeout(() => {
            setControl1(true)
        }, 200);
        setTimeout(() => {
            setControl2(true)
        }, 400);
        setTimeout(() => {
            setControl3(true)
        }, 600);
        setTimeout(() => {
            setDisplayText(true)
        }, 2000);
    }, []);

    console.log(control1)

    return (
        <div className={styles.home_page_container}>
            <div className={styles.mysterious_text_container}>
                {displayText && <MysteriousText colorsList={["#f04d4d", "#ffd903", "#5ba1fc", "#2dc40f"]}>Les Cataneurs
                    Fous</MysteriousText>}
            </div>
            <div className={styles.button_container}>
                <motion.div
                    className={styles.animated_button}
                    whileHover={{scale: 1.05}}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>
                    <NavLink to="/new_game">
                        <ColoredButton bgColor={'red'}>Nouvelle partie</ColoredButton>
                    </NavLink>
                </motion.div>
                {control1 && (<motion.div
                    className={styles.animated_button}
                    whileHover={{scale: 1.05}}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>

                    <NavLink to="/ranking">
                        <ColoredButton bgColor={'blue'} style={{position: "relative"}}>
                            Classement
                        </ColoredButton>
                        <motion.div
                            style={{position: "absolute"}}
                            initial={{top: '-100vh', right: -3}}
                            animate={{top: -24, right: -3}}
                            transition={
                                crownTransition
                            }>
                            <Crown style={{
                                width: "80px",
                                height: "80px",
                                zIndex: "1000",
                                rotate: "30deg",
                                fill: "#ffd903"
                            }}/>
                        </motion.div>
                    </NavLink>
                </motion.div>)}

                {control2 && (<motion.div
                    className={styles.animated_button}
                    whileHover={{scale: 1.05}}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>
                    <NavLink to="/games_list">
                        <ColoredButton bgColor={'green'}>Parties</ColoredButton>
                    </NavLink>
                </motion.div>)
                }
                {control3 && (<motion.div
                    className={styles.animated_button}
                    whileHover={{scale: 1.05}}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>
                    <NavLink to="/players_list">
                        <ColoredButton bgColor={'yellow'}>Cataneurs</ColoredButton>
                    </NavLink>
                </motion.div>)
                }
            </div>
        </div>
    )
}
