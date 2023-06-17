import { EIcons, Icons } from '../Icons';
import styles from './dataBlock.module.scss'

interface IDataBlock {
    data?: string;
    icon?: React.ReactNode;
    title?: string;
    className?: string;
}


export function DataBlock({data, icon, title, className}: IDataBlock) {
    
    return (
        <>
            <div className={className}>
                <div className={styles.data}>
                    <label className={styles.titleBlock}>{title}</label>
                    <span className={styles.dataDay}>{data}</span>
                </div>
                <div className={styles.icon}>
                    {icon}
                </div>
            </div>
        </>
    )
}
