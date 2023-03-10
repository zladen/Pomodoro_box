import * as React from 'react';

interface IButton {
    onClick?: () => void;
    className?: string;
    label?: string,
    children?: React.ReactNode;
    icon?: React.ReactNode; 
}

export const Button = ({className, onClick, label, children, icon}: IButton) => {
	return (
        <button className={className} onClick={onClick}>{icon}{children}{label}</button>
    )   
}