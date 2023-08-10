import * as React from 'react';

interface IButton {
    onClick?: () => void;
    className?: string;
    label?: string,
    children?: React.ReactNode;
    icon?: React.ReactNode;
    id?: string; 
}

export const Button = ({className, onClick, label, children, icon, id}: IButton) => {
	return (
        <button id={id} className={className} onClick={onClick}>{icon}{children}{label}</button>
    )   
}