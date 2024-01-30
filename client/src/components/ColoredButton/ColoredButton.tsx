import styles from "./ColoredButton.module.css"
import {ReactNode} from "react";

interface ColoredButtonProps {
    children: ReactNode;
    bgColor: string;
}

export default function ColoredButton({children, bgColor}: ColoredButtonProps) {
    const buttonClassName = `${styles.colored_button} ${styles[`${bgColor}_button`]}`;

    return (
        <button className={buttonClassName}>
            {children}
        </button>
    )
}