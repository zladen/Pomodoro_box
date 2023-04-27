import { useState } from "react";
import styles from './toggle.module.scss'

export interface IToggle {
    label?: string;
    toggled: boolean;
    onClick: (isToggled: boolean) => void;
}

export const Toggle = ({ label, toggled, onClick }: IToggle) => {
	const [isToggled, setIsToggled] = useState(toggled);

	const callback = () => {
		setIsToggled(!isToggled);
		onClick(!isToggled);
	};

	return (
		<label className={styles.toggleLabel}>
			<input className={styles.toggleInput} type="checkbox" defaultChecked={isToggled} onClick={callback} />
			<span className={styles.toggleSpan}></span>
			<strong className={styles.toggleStrong}>{label}</strong>
		</label>
	);
}

export default Toggle;