import * as React from "react";
import styles from "./RandomAvatar.module.css";
import {useState, useEffect} from "react";
import ColoredButton from "../ColoredButton/ColoredButton";
import {motion} from "framer-motion";
import {buttonTransition} from "../../utils/animationVariants";

const generateRandomAvatar = () => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.floor(
        Math.random() * 1000000
    )}`;
};

export default function RandomAvatar({onChange}: any) {
    const [newAvatar, setNewAvatar] = useState(generateRandomAvatar());

    useEffect(() => {
        onChange(newAvatar);
    }, [newAvatar]);

    return (
        <div
            className={styles.random_avatar_container}
        >
            <img
                width="150"
                src={newAvatar}
                alt="Your avatar"
            />
            <motion.div
                whileHover={{scale: 1.05}}
                transition={buttonTransition}
            >
                <ColoredButton
                    style={{width: '16vw', height: '6vh', fontSize: '1rem', marginTop: '0'}}
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