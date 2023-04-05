import { MenuIcon, IncreaseIcon, EditIcon, ReductionIcon, DeleteIcon, StatisticIcon, ArrowIcon, PlusIcon, TomatoIcon, CloseIcon } from '.';

export enum EIcons {
	statistic = 'StatisticIcon',
    plus = "IncreaseIcon",
    minus = 'ReductionIcon',
	edit = 'EditIcon',
    del = 'DeleteIcon',
    menu = 'MenuIcon',
	btnPlus = 'PlusIcon',
	arrow = 'ArrowIcon',
	tomato = 'TomatoIcon',
	close = 'CloseIcon'
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
		case EIcons.tomato:

			return <TomatoIcon />;
		case EIcons.close:

			return <CloseIcon />;
		default: 
			return <></>
	}
}
