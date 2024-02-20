import React from "react";

export interface ColoredInputProps {
    label: string;
    bgColor?: string;
    onClick?: any;
    value: string | number | null | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}