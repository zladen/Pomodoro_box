import { FocusIcon, PausedIcon, StoppedIcon, TomatoIcon, ArrowIcon } from '.';

export enum EIcons {
	focus = 'FocusIcon',
	paused = 'PausedIcon',
	stopped = 'StoppedIcon',
	tomato = 'TomatoIcon',
	arrow = 'ArrowIcon',
}

type TSizes = 16 | 17 | 24;

interface IIconProps {
    name?: EIcons;
    size?: TSizes;
	className?: string;
}

export function Icons(props: IIconProps) {
    const { name, size, className } = props;

    switch (name) {
		case EIcons.tomato:
			return <TomatoIcon />;

		case EIcons.focus:
			return <FocusIcon />;

		case EIcons.paused:
			return <PausedIcon />;

		case EIcons.stopped:
			return <StoppedIcon />;

		case EIcons.arrow:
			return <ArrowIcon />;
		
		default: 
			return <></>
	}
}
