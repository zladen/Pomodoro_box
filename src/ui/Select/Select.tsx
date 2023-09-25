import styles from './select.module.scss';
import { ArrowIcon } from '../Icons';
import { useSelect } from '../../hooks/useSelect';
import { IntervalTimeProps } from '../../constants';

export interface SelectProps {
    intervalTime: IntervalTimeProps[];
    onSelect?: (selected: IntervalTimeProps) => void;
}

const Select = ({ intervalTime, onSelect }: SelectProps) => {
    const { isOpen, selectedItem, toggleDropdown, selectItem } = useSelect({ intervalTime });
    const dropdownItems = intervalTime.filter(item => item.id !== selectedItem?.id);

    return (
        <div className={`select ${isOpen ? 'open' : ''}`}>
            <div className={styles.select__input} data-type="input" onClick={toggleDropdown}>
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
                                onClick={() => {
                                    selectItem(item);
                                    if(onSelect) {
                                        onSelect(item);
                                    }
                                }}
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






