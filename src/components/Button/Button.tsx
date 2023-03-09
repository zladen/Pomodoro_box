import * as React from 'react';

interface IButton {
    onClick?: () => void;
    className?: string;
    label?: string,
    children?: React.ReactNode;
}

export const Button = ({className, onClick, label, children}: IButton) => {
	return (
        <button className={className} onClick={onClick}>{children}{label}</button>
    )   
}