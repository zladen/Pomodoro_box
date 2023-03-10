import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import { EColor, Text } from '../Text';
import { EIcons, Icons, MenuIcon } from '../Icons';
import { Button } from '../Button/Button';

// export interface IMenuProps {
// 	postId?: string;
// }

export function Menu() {

	return (
		<div className={styles.menu}>
			<Dropdown
				button={<Button className={styles.menuButton} icon={<Icons name={EIcons.menu} />}/>}
			>
				<div className={styles.dropdown}>
					<MenuItemsList />
				</div>
			</Dropdown>
		</div>
	);
}



