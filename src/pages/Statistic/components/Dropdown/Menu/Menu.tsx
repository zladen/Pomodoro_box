import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from '../../../../../components/Button/Button';
import { EIcons, Icons } from '../../Icons';

interface IMenu {
	buttonClass?: string;
	//nameIcon?: EIcons;
	buttonLabel?: string;
	onClick?: () => void;
	taskId?: string;
	onEditNameTask?: () => void;
}

export function Menu(props: IMenu) {
	const [isModalOpened, setIsModalOpened] = useState(false);
	// const { t } = useTranslation();

	// const tasks = useSelector((state: RootState) => Object.values(state.tasks.tasks));
	// const pomodoro = useSelector((state: RootState) => state.config.pomodoro)
	// const dispatch = useDispatch();
	// const id = props.taskId;
	// const task = tasks.find((task) => task.id === id);
	
	// const handleAddPomodoro = () => {
	// 	if (task) {
	// 			const updated = {
	// 			...task,
	// 			duration: task.duration + (pomodoro / 60),
	// 		};
	// 		dispatch(updateTask(updated));
	// 	}
	// }

	// const handleShortPomodoro = () => {
	// 	if (task && task.duration > pomodoro / 60) {
	// 		const updated = {
	// 			...task,
	// 			duration: task.duration - (pomodoro / 60),
	// 		};
	// 		dispatch(updateTask(updated));
	// 	}
	// }

	// const handleEditNameTask = () => {
	// 	if (props.onEditNameTask) {
	// 	  	props.onEditNameTask();
	// 	}
	// };

	const menuItemsWeek = [
		{ 
			label: "Эта неделя", 
		
		},

		{ 
			label: "Прошлая неделя", 
		},

		{ 
			label: "2 недели назад", 
		},
	];

	return (
		<div className={styles.dropdownMenuBtn}>
			<Dropdown 
				button={<Button icon={<Icons name={EIcons.arrow} />}/>}
			>	
				<MenuItemsList 
					menuItems={menuItemsWeek}
					taskId={props.taskId} 
				/>	
			</Dropdown>
		</div>
	);
}

