import styles from "./ColoredInput.module.css"
import {useEffect} from "react";

interface ColoredInputProps {
    label: string;
    bgColor?: string;
    onClick?: any;
    value: string | null | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColoredInput({label, bgColor, onClick, value, onChange}: ColoredInputProps) {
    const coloredInputClassName = `${styles.colored_input} ${styles[`${bgColor}_input`]} ${styles[`${label}_input`]}`;


    useEffect(() => {
        if (value !== '') {
            console.log(value);
        }
    }, [value]);

    return (
        <div className={styles.input_container}>
            <input
                id={label}
                className={`${coloredInputClassName} ${
                    value !== '' ? `${styles.not_empty}` : ''
                }`}
                onClick={onClick}
                required={true}
                type={"text"}
                value={value || ""}
                onChange={onChange}
            />
            <label htmlFor={label} className={styles.input_label}>{label}</label>
        </div>

    )
}