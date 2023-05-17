import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';
import { nanoid } from 'nanoid';

export type RootState = ReturnType<typeof rootReducer>
export interface Task {
    id: string;
    name: string;
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as Task[],
    },

    reducers: {
        addTask(state, action) {
            const id = nanoid(8);
            state.tasks.push({
                id,
                name: action.payload.name,
                pomodoro: action.payload.pomodoro,
                longBreak: action.payload.longBreak,
                shortBreak: action.payload.shortBreak,
                //tomato: action.payload.tomato,
            });
        },

        addTime(state, action) {
            const { id, pomodoro } = action.payload;
            const timeToTask = state.tasks.find(task => task.id === id);

            if (timeToTask) {
                timeToTask.pomodoro = pomodoro;
            } else {
                console.error(`Task with id ${id} not found`);
            }
        },

        editTask(state, action) {
            const { id, name } = action.payload;
            const editTaskName = state.tasks.find(task => task.id === id);

            if (editTaskName) {
                editTaskName.name = name;
            } else {
                console.error(`Task with id ${id} not found`);
            }
        },

        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },

        updateTask(state, action) {
            state.tasks.forEach(task => {
                task.pomodoro = action.payload.pomodoro;
                task.shortBreak = action.payload.shortBreak;
                task.longBreak = action.payload.longBreak;
            });
        },
    },
});


export const {addTask, removeTask, editTask, addTime, updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;

