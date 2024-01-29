import styles from "./ColoredButton.module.css"
import {ReactNode} from "react";

interface ColoredButtonProps {
    children: ReactNode;
    bgColor: string;
    onClick?: any
}

export default function ColoredButton({children, bgColor, onClick}: ColoredButtonProps) {
    const buttonClassName = `${styles.colored_button} ${styles[`${bgColor}_button`]}`;

    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    )
}