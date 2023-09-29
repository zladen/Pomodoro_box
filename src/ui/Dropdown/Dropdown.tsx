import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.module.scss';
import useDropdown from '../../hooks/useDropdown';


interface IDropdownProps {
    button?: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

export function Dropdown({button, children, isOpen, onClose, onOpen}: IDropdownProps) {
    const { isOpen: isDropdownOpen, setIsOpen, dropdownRef, buttonRef } = useDropdown({
        isOpen,
        onOpen,
        onClose
    });

    const handleOpen = () => {
        setIsOpen(prev => !prev);
    }

    const [position, setPosition] = useState({ top: 0, left: 0 });
		useEffect(() => {
		function updatePos() {
			if (buttonRef.current !== null) {
				const pos = buttonRef.current.getBoundingClientRect();
				setPosition({
					top: pos.top + 37,
					left: pos.left + 30,
				})
			}
		}
		
		updatePos();
		window.addEventListener('resize', updatePos);
		window.addEventListener('scroll', updatePos);

		return () => {
			window.removeEventListener('resize', updatePos);
			window.removeEventListener('scroll', updatePos);
		};

	}, [isDropdownOpen]);

    return(
        <div className={styles.dropdownBtnContainer}>
            <div ref={buttonRef} onClick={handleOpen}>{ button }</div>
            {isDropdownOpen && ReactDOM.createPortal(
                <div ref={dropdownRef} className={styles.dropdownContainer} style={{top: `${position.top}px`, left: `${position.left}px`}}>
                    <div className={styles.dropdownListContainer} onClick={() => setIsOpen(false)}>{children}</div>
                </div>,
                document.querySelector('#menu_root')!,
            )}
        </div>
    );
}
