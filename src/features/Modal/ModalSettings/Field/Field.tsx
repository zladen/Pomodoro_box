import { useSelector } from 'react-redux';
import styles from './field.module.scss'
import { RootState } from '../../../../store/reducers/configSlice';
import { useSystemNotify } from '../../../../hooks/useSystemNotify';
import { useTranslation } from 'react-i18next';

interface IField {
    label: string,
    id: string,
    htmlFor: string,
    notes: string,
    value?: number;
    action?: (newValue: number) => void;
}

export const Field = (props: IField) => {
    const { t } = useTranslation();
    const { label, id, htmlFor, notes, value } = props;
    const { notify } = useSelector((state: RootState) => state.config);
    const { systemNotify } = useSystemNotify();
   
    const handleSwitch = (event: { target: { value: string } }) => {
        const newValue = parseInt(event.target.value);
        props.action && props.action(newValue);
        if (notify) {
            systemNotify(t("setting_saved"));
        }
    }

    return (
        <form className={styles.field}> 
            <label className={styles.labelField} htmlFor={htmlFor}> 
                {label}
            </label> 
            <div className={styles.formField}> 
                <input 
                    id={id} 
                    className={styles.inputField}
                    type="number"
                    onChange={handleSwitch}
                    value={value} 
                />  
            </div>
            <span className={styles.notesField}>
                {notes}
            </span> 
        </form>
    )
}
