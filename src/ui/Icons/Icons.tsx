	import { 
		MenuIcon, 
		IncreaseIcon, 
		EditIcon, 
		MinusIcon, 
		DeleteIcon, 
		StatisticsIcon, 
		ArrowIcon, 
		PlusIcon, 
		CloseIcon, 
		SettingsIcon ,
		FocusIcon, 
		PausedIcon, 
		StoppedIcon, 
		TomatoIcon,
		TomatoesIcon,
		LogoIcon
	} from '.';

export enum EIcons {
	statistics = 'StatisticIcon',
    plus = "IncreaseIcon",
    minus = 'MinusIcon',
	edit = 'EditIcon',
    del = 'DeleteIcon',
    menu = 'MenuIcon',
	btnPlus = 'PlusIcon',
	arrow = 'ArrowIcon',
	close = 'CloseIcon',
	settings = 'SettingsIcon',
	focus = 'FocusIcon',
	paused = 'PausedIcon',
	stopped = 'StoppedIcon',
	tomato = 'TomatoIcon',
	tomatoes = 'TomatoesIcon',
	logo = 'LogoIcon'
}

export interface IIconProps {
    name?: EIcons;
	className?: string | undefined;
	strokeColor?: string
}

export function Icons(props: IIconProps) {
    const { name, className } = props;

    switch (name) {
		case EIcons.statistics:
			return <StatisticsIcon />;

		case EIcons.plus:
			return <IncreaseIcon />;

		case EIcons.minus:
			return <MinusIcon className={className}/>;
				
		case EIcons.edit:
			return <EditIcon />;
				
		case EIcons.del:
			return <DeleteIcon />;
				
		case EIcons.btnPlus:
			return <PlusIcon />;
				
		case EIcons.menu:
			return <MenuIcon />;
				
		case EIcons.arrow:
			return <ArrowIcon />;

		case EIcons.close:
			return <CloseIcon />;

		case EIcons.settings:
			return <SettingsIcon />;

		case EIcons.tomato:
			return <TomatoIcon />;

		case EIcons.focus:
			return <FocusIcon />;

		case EIcons.paused:
			return <PausedIcon />;

		case EIcons.stopped:
			return <StoppedIcon />;

		case EIcons.tomatoes:
			return <TomatoesIcon />;

		case EIcons.logo:
			return <LogoIcon />;
			
		default: 
			return <></>
	}
}
