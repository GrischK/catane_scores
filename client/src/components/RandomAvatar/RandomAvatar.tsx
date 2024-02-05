import * as React from "react";
import {useState, useEffect} from "react";
import styles from "./RandomAvatar.module.css";
import ColoredButton from "../ColoredButton/ColoredButton";
import {motion} from "framer-motion";

const generateRandomAvatar = () => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.floor(
        Math.random() * 1000000
    )}`;
};

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

function RandomAvatar({onChange}: any) {
    const [newAvatar, setNewAvatar] = useState(generateRandomAvatar());

    useEffect(() => {
        onChange(newAvatar);
    }, [newAvatar]);

    return (
        <div className={styles.random_avatar_container}>
            <img width="150" src={newAvatar} alt="Your avatar"/>
            <motion.div
                whileHover={{scale: 1.05}}
                transition={buttonTransition}
            >
                <ColoredButton
                    style={{width:'16vw', height:'6vh', fontSize:'1rem'}}
                    bgColor={'yellow'}
                    onClick={() => setNewAvatar(generateRandomAvatar())}
                >
                    Choisis <br/>
                    ton avatar
                </ColoredButton>
            </motion.div>
        </div>
    );
}

export default RandomAvatar;
