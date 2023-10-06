import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, updateTask } from "../store/reducers/tasksSlice";
import { setNumberTask } from "../store/reducers/timerSlice";
import { RootState } from "../store/reducers/configSlice";
import { selectTasksArray } from "../features/PomodoroPage/Tasks/Tasks";

interface UseMenuProps {
	taskId?: string;
	onEditNameTask?: () => void;
}

export const useMenu = (props: UseMenuProps) => {
	const [isModalOpened, setIsModalOpened] = useState(false);
	const tasks = useSelector(selectTasksArray);
	const { numberTask } = useSelector((state: RootState) => state.timer);
	const dispatch = useDispatch();
	const id = props.taskId;
	const task = tasks.find((task) => task.id === id);
	
	const handleAddPomodoro = () => {
		if (task) {
				const updated = {
				...task,
				duration: task.duration + 1,
			};
			dispatch(updateTask(updated));
		}
	}

	const handleShortPomodoro = () => {
		if (task && task.duration >= 2) {
			const updated = {
				...task,
				duration: task.duration - 1,
			};
			dispatch(updateTask(updated));
		}
	}

	const handleCompletePomodoro = () => {
		if (task) {
			if (task.duration === 1) {
				dispatch(removeTask({ id: task.id }));
				dispatch(setNumberTask(numberTask + 1))
			} else {
				const updated = {
					...task,
					duration: task.duration - 1,
				};
				dispatch(updateTask(updated));
			}
		}
	};

	const handleEditNameTask = () => {
		if (props.onEditNameTask) {
		  	props.onEditNameTask();
		}
	};

	return {
        isModalOpened,
		setIsModalOpened,
        handleAddPomodoro,
		handleShortPomodoro,
		handleEditNameTask,
		handleCompletePomodoro,
		tasks,
		numberTask
    };
};

