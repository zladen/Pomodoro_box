import { useDispatch, useSelector } from 'react-redux';
import { tick } from '../../src/store/reducers/settingsSlice';
import { useEffect } from 'react';
import { RootState } from '../store/reducers/tasksSlice';

export function useTick() {
    const { isWorking } = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let intervalId: number | NodeJS.Timer | undefined;

        if (isWorking) {
            intervalId = setInterval(() => {
                dispatch(tick());
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch, isWorking]);

}
