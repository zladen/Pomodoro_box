import * as React from 'react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { EIcons, Icons } from '../Icons';
import { Menu } from '../Menu';
import styles from './main.module.scss'

export function Main() {
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };
    
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    return (
        <main className={styles.container}>
            <div className={styles.textBlock}>
                <h2>Ура! Теперь можно начать работать:</h2>
                <div className={styles.manual}>
                    <ul className={styles.manualList}>
                        <li>Выберите категорию и напишите название текущей задачи</li>
                        <li>Запустите таймер («помидор»)</li>
                        <li> Работайте пока «помидор» не прозвонит</li>
                        <li> Сделайте короткий перерыв (3-5 минут)</li>
                        <li>Продолжайте работать «помидор» за «помидором», пока задачи 
                            <br/> не будут выполнены. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
                        </li>
                    </ul>
                </div>

                <div className={styles.tasks}>
                    <input className={styles.nameTask} type="text" placeholder='Название задачи' value={inputValue} onChange={handleInputChange}/>
                    <Button onClick={handleClick} className={styles.btnAddTask} label='Добавить'/>
                    <div>
                        <ol className={styles.listTasks}>
                            {items.map((item, index) => (
                                <li key={index}>
                                    {item}
                                    <Menu />   
                                </li> 
                            ))}
                        </ol> 
                    </div>
                </div> 
            </div>           

            <div className={styles.timerWrapper}>
                <div className={styles.timerHeader}>
                    <span className={styles.timerNameTask}>Сверстать сайт</span>
                    <span className={styles.timerNameTask}>Помидор 1</span>
                </div>
                <div className={styles.timer}>
                    <div className={styles.timerMinutes}>
                        <span id="minutes">25</span>
                    </div>
                    <div className={styles.timerDivider}>:</div>
                    <div className={styles.timerSeconds}>
                        <span id="seconds">00</span>
                    </div>
                    <Button icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus} />
                </div>
                <span className={styles.timerTask}>Задача 1 - Сверстать сайт</span>
                <div className={styles.btnTimer}>
                    <Button className={styles.btnStart} label='Старт'/>
                    <Button className={styles.btnStop} label='Стоп'/>
                </div>
            </div>
        </main>
    );  
}