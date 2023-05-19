import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';

export type RootState = ReturnType<typeof rootReducer>

export interface ThemeState {
    theme: 'light' | 'dark';
}

const initialState: ThemeState = {
    theme: 'light' ,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme(state, action) {
            const { theme } = action.payload;
            if (theme === 'dark') {
                state.theme = 'dark';
            } else {
                state.theme = 'light';
            }

            // state.theme = 'light' ? 'dark' : 'light';
            // state.theme = theme ?? 'dark';
            //state.theme = action.payload.theme;
        },
    },
});


export const {switchTheme} = themeSlice.actions;
export default themeSlice.reducer;