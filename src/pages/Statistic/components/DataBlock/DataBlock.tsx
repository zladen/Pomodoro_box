import { EIcons, Icons } from '../Icons';
import styles from './dataBlock.module.scss'

interface IDataBlock {
    data?: string;
    icon?: React.ReactNode;
    title?: string;
    className?: string;
    value?: number;
}


export function DataBlock({data, icon, title, className, value}: IDataBlock) {
    
    return ( 
        <div className={className}>
            <div className={styles.wrapper}>
                <div className={styles.data}>
                    <div className={styles.titleBlock}>{title}</div>
                    <div className={styles.dataDay}>{value}</div>
                </div>
                <div className={styles.icon}>
                    {icon}
                </div>
            </div>
        </div>
    )
}
