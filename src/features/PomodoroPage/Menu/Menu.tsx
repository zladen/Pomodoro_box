import styles from './menu.module.scss';
import { Dropdown } from '../../../ui/Dropdown';
import { MenuItemsList } from './MenuItemsList';
import { EIcons, Icons } from '../../../ui/Icons';
import { Button } from '../../../ui/Button/Button';
import { ModalRemoveTask } from '../../Modal/ModalRemoveTask';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useMenu } from '../../../hooks/useMenu';

interface IMenuItemsProps {
	taskId?: string;
	onEditNameTask?: () => void;
}

export function Menu(props: IMenuItemsProps) {
	const { t } = useTranslation();

	const { 
		isModalOpened, 
		setIsModalOpened, 
		handleAddPomodoro, 
		handleShortPomodoro, 
		handleEditNameTask
	} = useMenu(props);

	const menuItemsPomodoro = [
		{ 
			label: t("zoom_in"), 
			icon: <Icons name={EIcons.plus} />, 
			onClick: () => handleAddPomodoro(), 
			className: 'menuItem',  
		},

		{ 
			label: t("zoom_out"), 
			icon: <Icons name={EIcons.minus} />, 
			onClick: () => handleShortPomodoro(), 
			className: 'menuItem', 
		},

		{ 
			label: t("edit"), 
			icon: <Icons name={EIcons.edit} />, 
			onClick: () => handleEditNameTask(), 
			className: 'menuItem' 
		},
		{ 
			label: t("remove"), 
			icon: <Icons name={EIcons.del} />, 
			onClick: () => setIsModalOpened(true), 
			className: 'menuItem' 
		},
	];

	return (
		<div className={styles.dropdownMenuBtn}>
			<Dropdown 
				button={<Button icon={<Icons name={EIcons.menu} />}/>}
				language={i18next.language}
			>	
				<MenuItemsList 
					menuItems={menuItemsPomodoro}
					taskId={props.taskId} 
				/>	
			</Dropdown>
			{isModalOpened && (
                <ModalRemoveTask id={props.taskId} onClose={() => { setIsModalOpened(false); }} />
            )}
		</div>
	);
}

