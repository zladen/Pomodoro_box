import styles from './menuItemsList.module.scss';
import { EIcons, Icons } from '../..//Icons';
import { Button } from '../../Button/Button';

interface IMenuItemsProps {
  postId?: string;
}

export function MenuItemsList({postId}: IMenuItemsProps) {
	return ( 
		<ul id={postId} className={styles.menuItemsList}>

			<li className={styles.menuItem} onClick={() => console.log('Увеличить')}>
				<Button className={styles.buttonItem} icon={<Icons name={EIcons.plus}/>} label='Увеличить'/>
			</li>

			<li className={styles.menuItem} onClick={() => console.log('Уменьшить')}>
				<Button className={styles.buttonItem} icon={<Icons name={EIcons.minus}/>} label='Уменьшить'/>
			</li>

			<li className={styles.menuItem} onClick={() => console.log('Редактировать')}>
				<Button className={styles.buttonItem} icon={<Icons name={EIcons.edit}/>} label='Редактировать'/>
			</li>

			<li className={styles.menuItem} onClick={() => console.log('Удалить')}>
				<Button className={styles.buttonItem} icon={<Icons name={EIcons.del}/>} label='Удалить'/>	
			</li>
			
		</ul>
	);
}
