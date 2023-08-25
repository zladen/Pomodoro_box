// import styles from './select.module.scss';
// import { ArrowIcon } from '../Icons';
// import { useSelect } from '../../hooks/useSelect';
// import { useState } from 'react';

// interface Item {
//     id: string;
//     value: string;
// }

// export interface SelectProps {
//     intervalTime: Item[];
//     onSelect?: (selected: Item) => void;
// }

// const Select = ({ intervalTime, onSelect }: SelectProps) => {
//     const [selectedInterval, setSelectedInterval] = useState<Item | undefined>(undefined);import styles from './select.module.scss';
// import { ArrowIcon } from '../Icons';
// import { useSelect } from '../../hooks/useSelect';
// import { useState } from 'react';

// interface Item {
//     id: string;
//     value: string;
// }

// export interface SelectProps {
//     intervalTime: Item[];
//     onSelect?: (selected: Item) => void;
// }

// const Select = ({ intervalTime, onSelect }: SelectProps) => {
//     const [selectedInterval, setSelectedInterval] = useState<Item | undefined>(undefined);
//     const { selectedItem, toggle, select, isOpen } = useSelect({ intervalTime });
//     const dropdownItems = intervalTime.filter(item => item.id !== selectedItem?.id);

//     return (
//         <div className={`select ${isOpen ? 'open' : ''}`}>
//             <div className={styles.select__input} data-type="input" onClick={toggle}>
//                 <span data-type="value">{selectedItem?.value}</span>
//                 <ArrowIcon className={styles.select__arrow} isOpen={isOpen} />
//             </div>
//             {isOpen && (
//                 <div className={styles.select__dropdown}>
//                     <ul className={styles.select__list}>
//                         {dropdownItems.map(item => (
//                             <li
//                                 key={item.id}
//                                 id={item.id}
//                                 className={`${styles.select__item}`}
//                                 data-type="item"
//                                 onClick={() => {
//                                     select(item);
//                                     if(onSelect) {
//                                         onSelect(item);
//                                     }
//                                 }}
//                             >
//                                 {item.value}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Select;
//     const { selectedItem, toggle, select, isOpen } = useSelect({ intervalTime });
//     const dropdownItems = intervalTime.filter(item => item.id !== selectedItem?.id);

//     return (
//         <div className={`select ${isOpen ? 'open' : ''}`}>
//             <div className={styles.select__input} data-type="input" onClick={toggle}>
//                 <span data-type="value">{selectedItem?.value}</span>
//                 <ArrowIcon className={styles.select__arrow} isOpen={isOpen} />
//             </div>
//             {isOpen && (
//                 <div className={styles.select__dropdown}>
//                     <ul className={styles.select__list}>
//                         {dropdownItems.map(item => (
//                             <li
//                                 key={item.id}
//                                 id={item.id}
//                                 className={`${styles.select__item}`}
//                                 data-type="item"
//                                 onClick={() => {
//                                     select(item);
//                                     if(onSelect) {
//                                         onSelect(item);
//                                     }
//                                 }}
//                             >
//                                 {item.value}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Select;

import styles from './select.module.scss';
import { ArrowIcon } from '../Icons';
import { useSelect } from '../../hooks/useSelect';
import { IntervalItem } from '../../constants';

export interface SelectProps {
    intervalTime: IntervalItem[];
    onSelect?: (selected: IntervalItem) => void; // Добавим callback для обработки выбора элемента
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






