import styles from "./toggled.module.scss";
import { useCallback } from "react";
import { useAutoStartBreak } from "../../hooks/useAutoStartBreak";

interface IToggled {
    label: string;
}

export const Toggled = ({label}: IToggled) => {
    const { autoStart, setAutoStart } = useAutoStartBreak();

    const autoStartModeTrue = useCallback(() => {
        setAutoStart(prevState => {
            return !prevState;
        });
    }, [setAutoStart]);

    const autoStartModeFalse = useCallback(() => {
        setAutoStart(prevState => {
            return !prevState;
        });
    }, [setAutoStart]);

    const handleToggle = useCallback((event: { target: { checked: boolean } }) => {
        event.target.checked ? autoStartModeTrue() : autoStartModeFalse();
    }, [autoStartModeTrue, autoStartModeFalse]);

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
                    checked={autoStart}
                />
                <label className={styles.darkModeLabel} htmlFor='auto-start-break'>
                </label>
            </div>
        </div>
        
    );
};

export default Toggled;


