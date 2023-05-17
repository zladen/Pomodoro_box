import { useState } from "react";
import styles from './toggle.module.scss'

export interface IToggle {
    label?: string;
    toggled: boolean;
    onChange: (isToggled: boolean) => void;
}

export const Toggle = ({ toggled, onChange }: IToggle) => {
	const [isToggled, setIsToggled] = useState(toggled);

	const callback = () => {
		setIsToggled(!isToggled);
		onChange(!isToggled);
	};

	return (
		<label className={styles.toggleLabel}>
			<input className={styles.toggleInput} type="checkbox" defaultChecked={isToggled} onClick={callback} />
			<span className={styles.toggleSpan}></span>
		</label>	
	);
}

export default Toggle;