import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTasksArray } from "../features/PomodoroPage/Tasks";
import { removeTask, updateTask } from "../store/reducers/tasksSlice";

interface UseMenuProps {
	taskId?: string;
	onEditNameTask?: () => void;
}

export const useMenu = (props: UseMenuProps) => {
	const [isModalOpened, setIsModalOpened] = useState(false);
	const tasks = useSelector(selectTasksArray);
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
		handleCompletePomodoro
    };
};

