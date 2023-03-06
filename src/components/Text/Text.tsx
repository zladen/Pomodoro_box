import React from 'react';
import styles from '../Text/text.module.scss';
import classNames from 'classnames'




export enum EColor {
    black = 'black',
    green = 'green',
    white = 'white',
    grayC4 = 'grayC4',
    gray66 = "gray66"
}
  
type TSizes = 24 | 20 | 16 | 14 | 12 | 10;

interface ITextProps {
    As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
    children?: React.ReactNode;
    size: TSizes;
    color?: EColor;

}

export function Text(props: ITextProps) {
	const { 
		As = 'span', 
		color= EColor.black, 
		children, size, 
	} = props;

  	const classes = classNames(
		styles[`s${size}`],
		styles[color]
    );

  	return (
		<As className={classes}>
			{children}
		</As>
	);
}
