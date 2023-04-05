import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../store';
import { nanoid } from 'nanoid';

export type RootState = ReturnType<typeof rootReducer>

export interface Task {
    id: string;
    name: string;
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
            });
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        }
    },
});

export const {addTask, removeTask} = tasksSlice.actions;
export default tasksSlice.reducer;



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