import styles from './scaleX.module.scss'
import classNames from 'classnames';
import { IBar } from '../Bar/Bar';

export const ScaleX = ({ activeBar, onClick, days }: IBar) => {
    return (
        <div className={styles.scaleXWrapper}>
            <div className={styles.scaleX}>
                <div 
                    id='mon' 
                    className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'mon' })} 
                    onClick={onClick}>Пн
                </div>
                <div 
                    id='tue' 
                    className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'tue' })} 
                    onClick={onClick}>Вт
                </div>
                <div 
                    id='wed' className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'wed' })} 
                    onClick={onClick}>Ср
                </div>
                <div 
                    id='thu' className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'thu' })} 
                    onClick={onClick}>Чт
                </div>
                <div 
                    id='fri' className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'fri' })} 
                    onClick={onClick}>Пт
                </div>
                <div 
                    id='sat' className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'sat' })} 
                    onClick={onClick}>Сб
                </div>
                <div 
                    id='sun' className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === 'sun' })} 
                    onClick={onClick}>Вс
                </div>
            </div>
        </div>
    )
}
