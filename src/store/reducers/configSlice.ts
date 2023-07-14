import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';

export type RootState = ReturnType<typeof rootReducer>

export interface ConfigState {
    value: boolean
    alerts: boolean
    soundAlerts: boolean,
    autoStartBreak: boolean
    autoStartPomodoro: boolean
    autoStartIfTodo: boolean  
    date: string
    clear: boolean    
    complete: boolean
    dateShort: string
    dateWeek: string
    delay: number
    goal: null
    locale: string
    long: number
    notifications: number
    notify: boolean
    notify_duration: number
    playAlarmSound: boolean | string
    playTickTockSoundWhileBreaks: boolean
    pomodoro: number
    rating: boolean    
    remains_minute: boolean
    report_daily: false
    report_time: number
    report_weekly: false
    short: number
    tasksTop:true
    theme: string
    time: string
    timezone: string
    volume: number
}

export const initialState: ConfigState = {
    value: false,
    alerts: false,
    soundAlerts: false,
    autoStartBreak: true,
    autoStartIfTodo: true,  
    autoStartPomodoro: true,
    date: "DD.MM.YYYY",
    clear: true,
    complete: true,
    dateShort: "DD.MM",
    dateWeek: "isoweek",
    delay: 4,
    goal: null,
    locale: "ru",
    long: 900,
    notifications: 10,
    notify: false,
    notify_duration: 0,
    playAlarmSound: false,
    playTickTockSoundWhileBreaks: false,
    pomodoro: 1500,
    rating: true,
    remains_minute: false,
    report_daily: false,
    report_time: 8,
    report_weekly: false,
    short: 300,
    tasksTop:true,
    theme: "light",
    time: "HH:mm",
    timezone: "Europe/Moscow",
    volume: 1,
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setAutoStartBreak(state, action: PayloadAction<boolean>) {
            state.autoStartBreak = action.payload
        },

        setAutoStartPomodoro(state, action: PayloadAction<boolean>) {
            state.autoStartPomodoro = action.payload
        },

        switchTheme(state, action) {
            state.theme = action.payload
            const { theme } = action.payload;
            if (theme === 'dark') {
                state.theme = 'dark';
            } else {
                state.theme = 'light';
            }
        },

        setTimeZone(state, action) {
            state.timezone = action.payload
        },

        setDate(state, action) {
            state.date = action.payload
        },

        setTime(state, action) {
            state.time = action.payload
        },

        setSoundAlerts(state, action: PayloadAction<boolean>) {
            state.soundAlerts = action.payload
        },

        setPomodoro(state, action) {
            state.pomodoro = action.payload
        },

        setShortBreak(state, action) {
            state.short = action.payload
        },

        setLongBreak(state, action) {
            state.long = action.payload
        },
        
        setDelay(state, action) {
            state.delay = action.payload
        },

        setAlarmSound(state, action) {
            state.playAlarmSound = action.payload
        },

        setNotify(state, action) {
            state.notify = action.payload
        },

        setAlerts(state, action) {
            state.alerts = action.payload
        },

        setRemains(state, action) {
            state.remains_minute = action.payload
        },

        setNotifyDuration(state, action) {
            state.notify_duration = action.payload
        },
    },
});

export const {
    setSoundAlerts,
    setAutoStartBreak, 
    setAutoStartPomodoro, 
    switchTheme, 
    setTimeZone, 
    setDate, 
    setTime,
    setPomodoro,
    setShortBreak,
    setLongBreak,
    setDelay,
    setAlarmSound,
    setNotify,
    setAlerts,
    setRemains,
    setNotifyDuration,
} = configSlice.actions;
export default configSlice.reducer;