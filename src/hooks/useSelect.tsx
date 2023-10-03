import { useState } from 'react';
import { IntervalTimeProps } from '../constants';

interface UseSelectProps {
    intervalTime: IntervalTimeProps[];
}

export function useSelect({ intervalTime }: UseSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IntervalTimeProps | undefined>(intervalTime ? intervalTime[0] : undefined);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item: IntervalTimeProps) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return {
        isOpen,
        selectedItem,
        toggleDropdown,
        selectItem,
    };
}