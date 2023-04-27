import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Setting {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
}

interface SettingPayload {
    pomodoro?: number;
    shortBreak?: number;
    longBreak?: number;
    useDefaultSettings?: boolean;
}

const defaultSettings: Setting = {
    pomodoro: 20,
    shortBreak: 5,
    longBreak: 15,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: defaultSettings,
    reducers: {
        settingPomodoro(state, action: PayloadAction<SettingPayload>) {
            const { pomodoro, shortBreak, longBreak, useDefaultSettings } = action.payload;
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
        },
    },
});

export const { settingPomodoro } = settingsSlice.actions;
export default settingsSlice.reducer;