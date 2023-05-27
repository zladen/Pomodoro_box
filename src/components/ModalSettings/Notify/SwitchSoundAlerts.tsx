import { useDispatch, useSelector } from "react-redux";
import styles from "../../Toggle/toggle.module.scss";
import { RootState } from "../../../store/reducers/tasksSlice";
import { setSoundAlerts } from "../../../store/reducers/configSlice";

interface IToggled {
    label: string;
}

export const SwitchSoundAlerts = ({label}: IToggled) => {
    const soundAlerts = useSelector((state: RootState) => state.config.soundAlerts);
    const dispatch = useDispatch();
    
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        dispatch(setSoundAlerts(newValue));
    }


    return (
        <div className={styles.autoStart}>
            <label htmlFor="auto-start-break" className={styles.label}>
                {label}
            </label>
            <div className={styles.darkMode}>
                <input
                    className={styles.darkModeInput}
                    type='checkbox'
                    id='auto-start-break'
                    onChange={handleToggle}
                    checked={soundAlerts}
                />
                <label className={styles.darkModeLabel} htmlFor='auto-start-break'>
                </label>
            </div>
        </div>
        
    );
};

export default SwitchSoundAlerts;