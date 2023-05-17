import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './tasksSlice';

export interface Setting {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    // autoStartPomodoro: boolean;
    autoStartBreak: boolean;
    isWorking: boolean;
    isPaused: boolean;
    isShortBreak: boolean;
    isLongBreak: boolean;
    counterShortBreak: number;
    counterPomodoro: number;
    minutes: number;
    seconds: number;
}

export interface SettingPayload {
    useDefaultSettings?: boolean;
    pomodoro?: number;
    shortBreak?: number;
    longBreak?: number;
    //autoStartPomodoro?: boolean;
    autoStartBreak?: boolean;
}

export const defaultSettings: Setting = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    //autoStartPomodoro: false,
    autoStartBreak: false,

    isWorking: false,
    isPaused: false,
    isShortBreak: false,
    isLongBreak: false,

    counterPomodoro: 0,
    counterShortBreak: 0,

    minutes: 1,
    seconds: 0,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: defaultSettings,

    reducers: {
        settings(state, action: PayloadAction<SettingPayload>) {
            const { pomodoro, 
                    shortBreak, 
                    longBreak, 
                    // autoStartPomodoro, 
                    autoStartBreak, 
                    useDefaultSettings 
                } = action.payload;

            state.pomodoro = useDefaultSettings 
                ? defaultSettings.pomodoro 
                : pomodoro 
                ?? defaultSettings.pomodoro;

            state.shortBreak = useDefaultSettings 
                ? defaultSettings.shortBreak 
                : shortBreak 
                ?? defaultSettings.shortBreak;

            state.longBreak = useDefaultSettings 
                ? defaultSettings.longBreak 
                : longBreak 
                ?? defaultSettings.longBreak;

            // state.autoStartPomodoro = autoStartPomodoro
            //     ?? defaultSettings.autoStartPomodoro;
        
            state.autoStartBreak = autoStartBreak
                ?? defaultSettings.autoStartBreak;

             //Сохранение состояния таймера
            state.isWorking = false;
            state.isPaused = false;
            state.isShortBreak = false;
            state.isLongBreak = false;
            //state.autoStartBreak = false;
            state.counterShortBreak = 0;
            state.counterPomodoro = 1;
            state.minutes = pomodoro ?? defaultSettings.pomodoro;
            state.seconds = 0;
        },

        start: (state) => {
            state.isWorking = true;
            state.isPaused = false;
        },

        pause: (state) => {
            state.isWorking = false;
            state.isPaused = true;
        },

        stop: (state) => {
            state.isWorking = false;
            state.isPaused = true;
            state.isShortBreak = false;
            state.isLongBreak = false;
            state.minutes = 0; // сбрасываем минуты таймера
            state.seconds = 0; // сбр
        },

        tick: (state) => {
            if (state.isWorking && state.minutes === 0 && state.seconds === 0) {
                if (!state.isShortBreak) { // Помидор закончился, начинаем перерыв
                    state.isShortBreak = true;
                    state.isWorking = true;
                    state.isPaused = true;
                    state.counterPomodoro++;
                    state.counterShortBreak++;

                    if (state.counterShortBreak % 4 === 0) { // Если нужно длинный перерыв
                        state.isLongBreak = true;
                        state.isWorking = true;
                        state.isPaused = true;
                        state.minutes = state.longBreak;
                    } else { // ... иначе короткий
                        state.minutes = state.shortBreak;
                    }
                } else { // Перерыв закончился, начинаем новый помидор
                    state.isShortBreak = false;
                    state.minutes = state.pomodoro;
                    state.isWorking = false;
                    state.isPaused = true;
                }
            } else if (state.isWorking || state.isPaused) {
                if (state.seconds === 0) {
                    state.minutes--;
                    state.seconds = 3; // не забудь исправить на 59
                } else {
                    state.seconds--;
                }
            }
        },
    },
});

export const { settings, start, pause, stop, tick } = settingsSlice.actions;
export default settingsSlice.reducer;