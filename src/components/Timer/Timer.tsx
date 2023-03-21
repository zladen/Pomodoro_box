
import { useDispatch, useSelector } from "react-redux";
//import { increment } from "../../store/reducers/tasksSlice";
//import { RootState } from "../../store/store";
import { Button } from "../Button/Button";
import { EIcons, Icons } from "../Icons";
import styles from "./timer.module.scss"


export function Timer() {
    //const count = useSelector((state: RootState) => state.counter.value)
    //const dispatch = useDispatch()

    return (
        <div className={styles.timer}>
            <div className={styles.timerHeader}>
                <span className={styles.timerTitle}>Сверстать сайт</span>
                <span id='counter' className={styles.countTomato}>Помидор 1</span>
            </div>
            <div className={styles.timerWrapper}>
                <div className={styles.timerBlock}>
                    <div className={styles.timerMinutes}>
                        <span id="minutes">25</span>
                    </div>
                    <div className={styles.timerBlock}>
                        <span className={styles.timerDivider}>:</span>
                    </div>
                    <div className={styles.timerSeconds}>
                        <span id="seconds">00</span>
                    </div>
                    <Button id='inc' icon={<Icons name={EIcons.btnPlus} />} className={styles.btnPlus} />
                </div>
            </div>
            
            <span className={styles.timerTask}>Задача 1 - Сверстать сайт</span>
            <div className={styles.btnTimer}>
                <Button className={styles.btnStart} label='Старт'/>
                <Button className={styles.btnStop} label='Стоп'/>
            </div>
        </div>
    )
}