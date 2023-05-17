import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/tasksSlice';
import TaskItem from '../TaskItem/TaskItem';
import styles from './taskList.module.scss';
import i18next from 'i18next';


export interface Props {
    totalTaskCount: string;
}

export const TaskList = () => {
    const lng = i18next.t.bind(i18next);
    //const { t } = useTranslation();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const totalTaskTime = tasks.reduce((total, task) => total + task.pomodoro, 0);
    const totalTaskCount = () => {
        const t = totalTaskTime;
        let hours = Math.floor( t / 60 );
        let minutes = Math.floor( t % 60 );

        let result = "";
        if (hours == 1 || hours == 21) {
            result+= `${hours} час`
        } else if (hours > 1 
            && hours <= 4 
            || hours >=  22 
            && hours <= 24) {
            result+= `${hours} часа` 
        } else if (hours && hours >= 5) {
            result+= `${hours} часов` 
        }

        if (minutes 
            && minutes == 1 
            || minutes == 21 
            || minutes == 31 
            || minutes == 41 
            || minutes == 51) {
            result+= ` ${minutes} минута` 
        } else if (minutes && minutes > 1 
            && minutes <= 4 || minutes >=  22 
            && minutes <= 24 || minutes >=  32 
            && minutes <= 34 || minutes >=  42 
            && minutes <= 44 || minutes >=  52 
            && minutes <= 54) {
            result+= ` ${minutes} минуты` 
        } else if (minutes && minutes >= 5) {
            result+= ` ${minutes} минут` 
        }

        return result;
    }  

    return (
        <>
            <ol className={styles.taskList}>
                {tasks.map((task, index) => (
                    <TaskItem nameTask={task.name} key={index} id={task.id} />
                ))}
            </ol>
            <div className={styles.taskTime}>{totalTaskCount()}</div>
        </>
    )
}

export default TaskList;

// const lng = i18next.language; // получаем текущий язык
//   let hoursLabel, minutesLabel;
//   if (lng === 'en') { // если язык английский, то присваиваем английские значения
//     hoursLabel = 'hours';
//     minutesLabel = 'minutes';
//   } else { // иначе используем стандартный перевод из основного файла
//     hoursLabel = i18next.t('hours');
//     minutesLabel = i18next.t('minutes');
//   }
//   ...

//   if (hours == 1 || hours == 21) {
//     result+= `${hours} ${hoursLabel}`;
//   } else if (hours > 1 && hours <= 4 || hours >= 22 && hours <= 24) {
//     result+= `${hours} ${i18next.t('hour')}`; 
//   } else if (hours && hours >= 5) {
//     result+= `${hours} ${hoursLabel}`; 
//   }

//   if (minutes && minutes == 1 || minutes == 21 || minutes == 31 || minutes == 41 || minutes == 51) {
//     result+= ` ${minutes} ${minutesLabel}`; 
//   } else if (minutes && minutes > 1 && minutes <= 4 || minutes >= 22 && minutes <= 24 || minutes >= 32 && minutes <= 34 || minutes >= 42 && minutes <= 44 || minutes >= 52 && minutes <= 54) {
//     result+= ` ${minutes} ${i18next.t('minute')}`; 
//   } else if (minutes && minutes >= 5) {
//     result+= ` ${minutes} ${minutesLabel}`; 
//   }

// import { useSelector } from 'react-redux';
// import { RootState } from '../../../store/reducers/tasksSlice';
// import TaskItem from '../TaskItem/TaskItem';
// import styles from './taskList.module.scss';
// import i18next from 'i18next';

// interface Props {
//   totalTaskCount: string;
// }

// const TaskList = () => {
//     const lng = i18next.language;
//     const tasks = useSelector((state: RootState) => state.tasks.tasks);
//     const totalTaskTime = tasks.reduce((total, task) => total + task.pomodoro, 0);
//     const totalTaskCount = () => {
//         let hoursLabel, minutesLabel;
//         if (lng === 'en') {
//             hoursLabel = 'hours';
//             minutesLabel = 'minutes';
//         } else {
//             hoursLabel = i18next.t('hours');
//             minutesLabel = i18next.t('minutes');
//         }
        
//         let hours = Math.floor(totalTaskTime / 60);
//         let minutes = Math.floor(totalTaskTime % 60);
//         let result = "";

//         if (hours == 1 || hours == 21) {
//             result+= `${hours} ${hoursLabel}`
//         } else if (hours > 1 && hours <= 4 || hours >= 22 && hours <= 24) {
//             result+= `${hours} ${i18next.t('hour')}` 
//         } else if (hours && hours >= 5) {
//             result+= `${hours} ${hoursLabel}` 
//         }

//         if (minutes && minutes == 1 
//             || minutes == 21 
//             || minutes == 31 
//             || minutes == 41 
//             || minutes == 51) {
//             result+= ` ${minutes} ${minutesLabel}` 
//         } else if (minutes && minutes > 1 && minutes 
//             <= 4 || minutes >= 22 && minutes 
//             <= 24 || minutes 
//             >= 32 && minutes 
//             <= 34 || minutes 
//             >= 42 && minutes 
//             <= 44 || minutes 
//             >= 52 && minutes 
//             <= 54) {
//             result+= ` ${minutes} ${i18next.t('minute')}`
//         } else if (minutes && minutes >= 5) {
//             result+= ` ${minutes} ${minutesLabel}` 
//         }

//         return result;
//     }

//     return (
//         <>
//             <ol className={styles.taskList}>
//                 {tasks.map((task, index) => (
//                 <TaskItem nameTask={task.name} key={index} id={task.id} />
//                 ))}
//             </ol>
//             <div className={styles.taskTime}>{totalTaskCount()}</div>
//         </>
//     )
// }

// export default TaskList;
