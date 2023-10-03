import styles from "./switch.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/configSlice";
import { useSystemNotify } from "../../hooks/useSystemNotify";

interface ISwitch {
    label: string;
    htmlFor: string;
    id: string;
    value?: boolean | string;
    action: (newValue: boolean) => void;
}; 

export const Switch = (props: ISwitch) => {
    const { label, htmlFor, id, value } = props;
    const { notify } = useSelector((state: RootState) => state.config);
    const { systemNotify } = useSystemNotify();
    
    const handleSwitch = (event: { target: { checked: boolean } }) => {
        const newValue = event.target.checked;
        props.action(newValue);
        if (notify) {
            systemNotify("Настройки сохранены");
        }
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


