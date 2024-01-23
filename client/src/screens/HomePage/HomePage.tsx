import React, {useEffect, useState} from "react";
import styles from './HomePage.module.css';
import {NavLink} from "react-router-dom";
import ColoredButton from "../../components/ColoredButton/ColoredButton";
import MysteriousText from "../../components/MysteriousText";
import {motion} from "framer-motion"
import {ReactComponent as Crown} from "../../assets/images/crown.svg"

export default function HomePage() {
    const [control1, setControl1] = useState(false);
    const [control2, setControl2] = useState(false);
    const [control3, setControl3] = useState(false);
    const [displayText, setDisplayText] = useState(false)
    const buttonTransition = {
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
        }
    }

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


    return (
        <div className={styles.home_page_container}>
            <div className={styles.mysterious_text_container}>
                {displayText && <MysteriousText>Les Cataneurs Fous</MysteriousText>}
            </div>
            <div className={styles.button_container}>
                <motion.div
                    whileHover={{scale: 1.05}}
                    onHoverStart={e => {
                    }}
                    onHoverEnd={e => {
                    }}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>
                    <NavLink to="/new_game">
                        <ColoredButton bgColor={'red'}>Nouvelle partie</ColoredButton>
                    </NavLink>
                </motion.div>
                {control1 && (<motion.div
                    whileHover={{scale: 1.05}}
                    onHoverStart={e => {
                    }}
                    onHoverEnd={e => {
                    }}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>

                    <NavLink to="/ranking" style={{position:"relative"}}>
                        <ColoredButton bgColor={'blue'}>
                            Classement
                        </ColoredButton>
                        <Crown style={{
                            position: "absolute",
                            width: "80px",
                            height: "80px",
                            zIndex: "100",
                            top: "-90px",
                            right: "0",
                            rotate: "30deg",
                            fill:"#ffd903"
                        }}/>
                    </NavLink>
                </motion.div>)}

                {control2 && (<motion.div
                    whileHover={{scale: 1.05}}
                    onHoverStart={e => {
                    }}
                    onHoverEnd={e => {
                    }}
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    transition={buttonTransition}>
                    <NavLink to="/games_list">
                        <ColoredButton bgColor={'green'}>Parties</ColoredButton>
                    </NavLink>
                </motion.div>)
                }
                {control3 && (<motion.div
                    whileHover={{scale: 1.05}}
                    onHoverStart={e => {
                    }}
                    onHoverEnd={e => {
                    }}
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
