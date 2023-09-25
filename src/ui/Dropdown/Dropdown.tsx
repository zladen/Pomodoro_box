import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.module.scss';

interface IDropdownProps {
	button?: React.ReactNode;
	children: React.ReactNode;
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
	language: string;
}

const NOOP = () => {};

export function Dropdown({button, children, isOpen, onClose = NOOP, onOpen = NOOP, language}: IDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
	useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
	useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

	const handleOpen = () => {
		if (isOpen === undefined) {
		  	setIsDropdownOpen(!isDropdownOpen);
			if (!isDropdownOpen) {
				onCloseAll();
			}
		} else {
		  	setIsDropdownOpen(isOpen);
			if (isOpen) {
				onCloseAll();
			}
		}
	}

	const onCloseAll = () => {
		const dropdowns = document.querySelectorAll(`.${styles.listContainer}`);
		if (dropdowns) {
			dropdowns.forEach(dropdown => {
				if (dropdown.parentNode) {
					dropdown.parentNode.removeChild(dropdown);
				}
			});
		}
	};

	const menuNode = document.querySelector('#menu_root');
    if (!menuNode) return null;

	const buttonRef = useRef<HTMLDivElement>(null);
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
				<div className={styles.dropdownContainer} style={{top: `${position.top}px`, left: `${position.left}px`}}>
					<div className={styles.dropdownListContainer} onClick={() => setIsDropdownOpen(false)}>{children}</div>
				</div>,
				menuNode,
			)}
		</div>
	);
}
