import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/historySlice';

interface Item {
    id: string;
    value: string;
}

interface SelectHookProps {
    data: Item[];
}

interface SelectHookResult {
    isOpen: boolean;
    selectedItem: Item | undefined;
    filteredTasks: object[];
    toggle: () => void;
    select: (item: Item) => void;
    close: () => void;
}

export const useSelect = ({ data }: SelectHookProps): SelectHookResult => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | undefined>(data[0]);

    const historyData = useSelector((state: RootState) => state.history.data);
    const tasksArray = Object.values(historyData);

    const getSelectedInterval = (selectedInterval: string) => {
        const currentDate = new Date();
        let startDate, endDate;

        if (selectedInterval === 'pastWeek') {
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 7);
            endDate = currentDate;
        } else if (selectedInterval === 'twoWeeksAgo') {
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 14);
            endDate = new Date();
            endDate.setDate(currentDate.getDate() - 7);
        } else if (selectedInterval === 'thisWeek') {
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - currentDate.getDay());
            endDate = currentDate;
        }

        return { startDate, endDate };
    };

    const { startDate, endDate } = getSelectedInterval(selectedItem?.id || '');

    const filteredTasks = tasksArray.filter((task) => {
        const taskCreatedDate = new Date(task.created);
        if (startDate && endDate !== undefined)
        return taskCreatedDate >= startDate && taskCreatedDate <= endDate;
        return false;
    });

    //console.log(filteredTasks)

    const toggle = () => {
        setIsOpen((prevState) => !prevState);
    };

    const select = (item: Item) => {
        setSelectedItem(item);
        close();
    };

    const close = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        selectedItem,
        filteredTasks,
        toggle,
        select,
        close,
    };
};

