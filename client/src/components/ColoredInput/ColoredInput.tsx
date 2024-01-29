import styles from "./ColoredInput.module.css"
import {useEffect} from "react";

interface ColoredInputProps {
    label: string;
    bgColor?: string;
    onClick?: any;
    value: string | number | null | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColoredInput({label, bgColor, onClick, value, onChange}: ColoredInputProps) {
    const coloredInputClassName = `${styles.colored_input} ${styles[`${bgColor}_input`]} ${styles[`${label}_input`]}`;
    const formattedLabel = inputText(label);


    useEffect(() => {
        if (value !== '') {
            console.log(value);
        }
    }, [value]);

    function inputText(label: string) {
        const textArray = label.split('')
        textArray[0] = textArray[0].toUpperCase();
        return textArray.join('')
    }

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
            <label htmlFor={label} className={styles.input_label}>{formattedLabel}</label>
        </div>

    )
}