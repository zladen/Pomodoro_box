import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '../store';
import { nanoid } from 'nanoid';

export type RootState = ReturnType<typeof rootReducer>

export interface Task {
    id: string;
    name: string;
    time: number;
}

const DEFAULT_TASK_TIME = 25;

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
                time: action.payload.time || DEFAULT_TASK_TIME, 
            });
        },

        addTime(state, action) {
            const { id, time } = action.payload;
            const timeTotask = state.tasks.find(task => task.id === id);

            if (timeTotask) {
                timeTotask.time = time;
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
        }
    },
});

export const {addTask, removeTask, editTask, addTime} = tasksSlice.actions;
export default tasksSlice.reducer;


// const { id, time } = action.payload;
//             const taskIndex = state.tasks.findIndex(task => task.id === id);

//             if (taskIndex !== -1) {
//                 state.tasks[taskIndex].time = time;
//                 return state.tasks[taskIndex];
//             }
// export interface CounterState {
//   	value: number
// }

// const initialState: CounterState = {
//   	value: 1,
// }

// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.value += 1
//         },
//         decrement: (state) => {
//             state.value -= 1
//         },
//         incrementByAmount: (state, action: PayloadAction<number>) => {
//         state.value += action.payload
//         },
//     },
// })

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export default counterSlice.reducer