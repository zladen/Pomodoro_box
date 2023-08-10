import React from 'react';
import styles from './select.module.scss';
import { ArrowIcon } from '../Icons';
import { useSelect } from '../../hooks/useSelect';


interface Item {
    id: string;
    value: string;
}

interface SelectProps {
    data: Item[];
}

const Select: React.FC<SelectProps> = ({ data }) => {
    const { selectedItem, toggle, select, isOpen } = useSelect({ data });
    const dropdownItems = data.filter(item => item !== selectedItem);

    return (
        <div className={`select ${isOpen ? 'open' : ''}`}>
            <div className={styles.select__input} data-type="input" onClick={toggle}>
                <span data-type="value">{selectedItem?.value}</span>
                <ArrowIcon className={styles.select__arrow} isOpen={isOpen} />
            </div>
            {isOpen && (
                <div className={styles.select__dropdown}>
                    <ul className={styles.select__list}>
                        {dropdownItems.map(item => (
                            <li
                                key={item.id}
                                id={item.id}
                                className={`${styles.select__item}`}
                                data-type="item"
                                onClick={() => select(item)}
                            >
                                {item.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Select;





