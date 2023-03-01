import React from 'react';
import { PomodoroIcon, StatisticIcon } from '../Icons';


export enum EIcons {
    pomodoro = 'PomodoroIcon',
    statistic = 'StatisticIcon'
}

type TSizes = 10 | 12 | 14 | 15 | 16;

interface IIconProps {
    name: EIcons;
    size?: TSizes;
	className?: string;
}

export function Icons(props: IIconProps) {
    const { name, size, className } = props;

    switch (name) {
		case EIcons.pomodoro:
			return (
				<PomodoroIcon width={size} height={size}/>
			)
        case EIcons.pomodoro:
            return (
                <StatisticIcon width={size} height={size}/>
            )
        default: 
		return <></>
	}
}