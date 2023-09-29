import { useEffect, useRef, useState } from "react";
import styles from '../ui/Dropdown/dropdown.module.scss';

interface UseDropdownOptions {
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

function useDropdown(options: UseDropdownOptions = {}) {
    const { isOpen: initialIsOpen, onOpen = () => {}, onClose = () => {} } = options;

    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsOpen(initialIsOpen);
    }, [initialIsOpen]);

    useEffect(() => {
        isOpen ? onOpen() : onClose();
    }, [isOpen]);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            if (dropdownRef.current && 
                buttonRef.current && 
                event.target instanceof Node && 
                !dropdownRef.current.contains(event.target) && 
                !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    return {
        isOpen,
        setIsOpen,
        dropdownRef,
        buttonRef
    };
}

export default useDropdown;
