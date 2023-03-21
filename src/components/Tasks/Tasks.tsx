import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, RootState } from "../../store/reducers/tasksSlice";
import { Button } from "../Button/Button";
import { EIcons } from "../Icons";
import { Menu, menuItemsPomodoro } from "../Menu";
import styles from './tasks.module.scss'


export function Tasks() {
    const tasks = useSelector((state: RootState) => state.tasks.items);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleAction = () => {
        if(inputValue.trim().length) {
            dispatch(addTask({ name: inputValue }));
            setInputValue('');
        }
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={styles.tasksWrapper}>
            <input className={styles.nameTask} type="text" placeholder='Название задачи' value={inputValue} onChange={handleInputChange}/>
            <Button onClick={handleAction} className={styles.btnAddTask} label='Добавить'/>
            <div>
                <ol className={styles.listTasks}>
                    {tasks.map((task) => (
                        <li key={task.id} className={styles.itemTask}>
                            {task.name}
                            <Menu 
                                buttonClass={styles.menuButton} 
                                nameIcon={EIcons.menu} 
                                menuItems={menuItemsPomodoro}
                            />   
                        </li> 
                    ))}
                </ol> 
            </div>
        </div> 
    )
}
