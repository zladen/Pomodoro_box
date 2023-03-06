import * as React from 'react';
import styles from './button.module.scss'

interface IButton {
    onClick?: () => void;
    className?: string;
    label: string,
}

export const Button = ({className, onClick, label}: IButton) => {
	return (
        <button className={className} onClick={onClick}>{label}</button>
    )   
}