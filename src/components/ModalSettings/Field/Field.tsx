import styles from './field.module.scss'

interface IField {
    label: string,
    id: string,
    htmlFor: string,
    notes: string,
    value?: number;
    action?: (newValue: number) => void;
}

export const Field = (props: IField) => {
    const { label, id, htmlFor, notes, value } = props;
   
    const handleSwitch = (event: { target: { value: string } }) => {
        const newValue = parseInt(event.target.value);
        props.action && props.action(newValue);
        console.log(newValue);
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
