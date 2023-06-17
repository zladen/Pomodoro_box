import { MenuIcon, 
		 IncreaseIcon, 
		 EditIcon, 
		 ReductionIcon, 
		 DeleteIcon, 
		 StatisticIcon, 
		 ArrowIcon, 
		 PlusIcon, 
		 CloseIcon, 
		 SettingsIcon } from '.';

export enum EIcons {
	statistic = 'StatisticIcon',
    plus = "IncreaseIcon",
    minus = 'ReductionIcon',
	edit = 'EditIcon',
    del = 'DeleteIcon',
    menu = 'MenuIcon',
	btnPlus = 'PlusIcon',
	arrow = 'ArrowIcon',
	close = 'CloseIcon',
	settings = 'SettingsIcon',
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
		case EIcons.statistic:
			return <StatisticIcon />;

		case EIcons.plus:
			return <IncreaseIcon />;

		case EIcons.minus:
			return <ReductionIcon />;
				
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
		default: 
			return <></>
	}
}
