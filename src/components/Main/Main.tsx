import * as React from 'react';
import { Button } from '../Button/Button';
import { Text, EColor } from '../Text';
import styles from './main.module.scss'
// import { BtnPlus } from '../Icons';
// import { Button } from '../Button';

export interface ITask {
	nameTask: string;
}

export function Main() {

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
                    <input className={styles.nameTask} type="text" placeholder='Название задачи'/>
                    <Button className={styles.btnAddTask} label='Добавить'/>
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
                    {/* <BtnPlus /> */}
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