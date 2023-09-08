import * as React from "react";
import {useState, useEffect} from "react";
import styles from "./RandomAvatar.module.css";
import {Button} from "@mui/material";

const generateRandomAvatar = () => {
    return `https://avatars.dicebear.com/api/avataaars/:${Math.floor(
        Math.random() * 1000000
    )}.svg`;
};

function RandomAvatar({onChange}: any) {
    const [newAvatar, setNewAvatar] = useState(generateRandomAvatar());

    useEffect(() => {
        onChange(newAvatar);
    }, [newAvatar]);

    return (
        <div className={styles.random_avatar_container}>
            <img width="150" src={newAvatar} alt="Your avatar"/>
            <Button
                variant="contained"
                className={styles.random_avatar_button}
                onClick={() => setNewAvatar(generateRandomAvatar())}
            >
                Choisis <br/>
                ton avatar
            </Button>
        </div>
    );
}

export default RandomAvatar;
