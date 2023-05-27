import { useCallback } from "react";
import styles from "./switch.module.scss";

interface ISwitch {
    label: string;
    htmlFor: string;
    id: string;
    value?: boolean | string;
    action: (newValue: boolean | string) => void;
}; 

export const Switch = (props: ISwitch) => {
    const { label, htmlFor, id, value } = props;
    
    const handleSwitch = (event: { target: { checked: boolean | string } }) => {
        const newValue = event.target.checked;
        props.action(newValue);
        console.log(newValue);
    }

    const checked = typeof value === "string" ? value == "true" : value;

    return (
        <div className={styles.switch}>
            <label htmlFor={htmlFor} className={styles.labelSwitch}>
                {label}
            </label>
            <div className={styles.modeSwitch}>
                <input
                    className={styles.modeInputSwitch}
                    type='checkbox'
                    id={id}
                    onChange={handleSwitch}
                    checked={checked}
                />
                <label className={styles.modeLabelSwitch} htmlFor={htmlFor}>
                </label>
            </div>
        </div>
        
    );
};

export default Switch;


