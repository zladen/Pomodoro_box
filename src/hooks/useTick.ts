import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../store/reducers/tasksSlice';
import { 
    pausedTimer, 
    setDuration, 
    setEndTime, 
    setMode, 
    setRemains, 
    setResumed, 
    setSeries, 
    setStarted, 
    startedTimer, 
    stoppedTimer 
} from '../store/reducers/timerSlice';
import { useSoundAlerts } from './useSoundAlerts';
import { useSystemNotify } from './useSystemNotify';
import { useShowAlerts } from './useShowAlerts';

export function useTick() {
    const { 
        pomodoro, 
        short, 
        long, 
        autoStartBreak, 
        autoStartPomodoro, 
        delay, 
        notify, 
        remains, 
        alerts 
    } = useSelector((state: RootState) => state.config);
    const { state, mode, duration, series, started, endtime } = useSelector((state: RootState) => state.timer);
    const initialMinutes = duration / 1000 / 60;
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);
    const [counterShort, setСounterShort] = useState(1);
    const [counterPomodoros, setCounterPomodoros] = useState(1);
    const { playAlarmSoundOnTickEnd } = useSoundAlerts();
    const { systemNotify } = useSystemNotify();
    const { showAlertModal } = useShowAlerts();


    const dispatch = useDispatch();

    let intervalId: number | NodeJS.Timeout | undefined;

    useEffect(() => {
        const initialMinutes = duration / 1000 / 60;
        setMinutes(initialMinutes);
    }, [mode, duration]);

    useEffect(() => {

        if (mode === "pomodoro") {
            dispatch(setDuration(pomodoro * 1000));
        }

        if (mode === 'short') {
            dispatch(setDuration(short * 1000))
        }

        if (mode === 'long') {
            dispatch(setDuration(long * 1000))
        }

        if (state === 'started') {
            intervalId = setInterval(() => {
                setSeconds((prevValue) => prevValue > 0 ? prevValue - 1 : 5);
                setMinutes((prevValue) => prevValue > 0 && seconds === 0 ? prevValue - 1 : prevValue);
            }, 1000);
        } 
            
        return () => clearInterval(intervalId);
    }, [state, pomodoro, short, long, minutes, seconds]);
    
    useEffect(() => {
        if (state === "started") {
            if (minutes <= 1 && seconds === 0) {
                if (remains) {
                    playAlarmSoundOnTickEnd();
                }

                if (notify && minutes !== 0) {
                    systemNotify("До завершения меньше одной минуты");
                }
            }

            if (mode === "pomodoro" && minutes === 0 && seconds === 0) {
                if (notify) {
                    systemNotify("Помидор закончился, начинаем перерыв");
                }

                playAlarmSoundOnTickEnd();
                setCounterPomodoros((prevValue) => prevValue + 1);
                if (counterShort % delay === 0) {
                    dispatch(setMode("long"));
                    setСounterShort(0);
                } else {
                    dispatch(setMode("short"))
                }
                if (!autoStartBreak) {
                    dispatch(pausedTimer("paused"));
                }  

            } else if ((mode === "short" || mode === "long") && minutes === 0 && seconds === 0) {
                if (notify) {
                    systemNotify("Перерыв закончился, начинаем помидор");
                }

                playAlarmSoundOnTickEnd();
                if (mode === "short") {
                    setСounterShort((prevValue) => prevValue + 1);
                }
                dispatch(setMode("pomodoro")); 
                if (!autoStartPomodoro) {
                    dispatch(pausedTimer("paused"));
                } 
            }
        }
    }, [seconds, minutes]);

    const clickStart = () => {
        dispatch(startedTimer('started'));
        if (started == 0) {
            dispatch(setStarted(new Date().getTime()));
        } else {
            dispatch(setResumed(new Date().getTime()));
        }
        dispatch(setEndTime(new Date().getTime() + duration));
    }

    const clickPause = () => {
        const remains = endtime - new Date().getTime();
        dispatch(setRemains(remains));
        dispatch(pausedTimer('paused'));
    }

    const clickStopped = () => {
        if (state === 'paused' && mode === 'pomodoro') {
            setCounterPomodoros(prev => prev + 1);
            dispatch(stoppedTimer('stopped'));
            clearInterval(intervalId);
            setMinutes(initialMinutes);
            setSeconds(0);
        } else if (mode === 'short' || mode === 'long') {
            dispatch(setMode("pomodoro"));
            dispatch(stoppedTimer('stopped'));
            clearInterval(intervalId);
            setMinutes(initialMinutes);
            setSeconds(0);
        } else {
            dispatch(stoppedTimer('stopped'));
            clearInterval(intervalId);
            setMinutes(initialMinutes);
            setSeconds(0);
            setСounterShort(1);
            setCounterPomodoros(1);
        }
        
    }

    const clickMinutes = () => {
        let addMinutes = minutes + 1;
        setMinutes(addMinutes);
    }

    return {
        state,
        mode,
        minutes,
        seconds,
        series,
        clickStart,
        clickPause,
        clickStopped,
        clickMinutes,
        counterShort,
        counterPomodoros
    };
}

