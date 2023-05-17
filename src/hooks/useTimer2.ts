import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tick } from '../../src/store/reducers/settingsSlice';
import { RootState } from "../store/reducers/tasksSlice";

export function useTimer(pomodoro = 0, shortBreak = 0, longBreak = 0) {
    const { isWorking, isPaused, isShortBreak, isLongBreak, counterShortBreak } = useSelector((state: RootState) => state.settings);
    const [minutes, setMinutes] = useState(pomodoro);
    const [seconds, setSeconds] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        let intervalId: number | NodeJS.Timeout | undefined;

        if (isWorking) {
            intervalId = setInterval(() => {
                dispatch(tick());
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [dispatch, isWorking]);

    useEffect(() => {
        if (isWorking && minutes === 0 && seconds === 0) {
            if (!isShortBreak) { // Помидор закончился, начинаем перерыв
                dispatch({
                    type: "settings/shortBreak",
                    payload: {},
                });

                if ((counterShortBreak + 1) % 4 === 0) { // Если нужен длинный перерыв
                    dispatch({
                        type: "settings/longBreak",
                        payload: {},
                    });
                    setMinutes(longBreak);
                } else { // ... иначе короткий
                    dispatch({
                        type: "settings/shortBreak",
                        payload: {},
                    });
                    setMinutes(shortBreak);
                }
            } else { // Перерыв закончился, начинаем новый помидор
                dispatch({
                    type: "settings/endBreak",
                    payload: {},
                });
                setMinutes(pomodoro);
            }
        } else if (isWorking || isPaused) {
            if (seconds === 0) {
                setMinutes((prevMinutes) => prevMinutes - 1);
                setSeconds(59);
            } else {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
        }
    }, [dispatch, isWorking, isPaused, isShortBreak, isLongBreak, counterShortBreak, minutes, seconds, shortBreak, longBreak, pomodoro]);
}