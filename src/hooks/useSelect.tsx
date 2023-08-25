import { useState } from 'react';
import { IntervalTimeProps } from '../constants';

interface UseSelectProps {
    intervalTime: IntervalTimeProps[];
}

export function useSelect({ intervalTime }: UseSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IntervalTimeProps | undefined>(intervalTime ? intervalTime[0] : undefined);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectItem = (item: IntervalTimeProps) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return {
        isOpen,
        selectedItem,
        toggleDropdown,
        selectItem,
    };
}

// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/reducers/configSlice';
// import { Task } from '../store/reducers/historySlice';
// import moment from 'moment';
// import { Item, IStatistic } from '../features/StatisticPage'
// import { defaultTasksData } from '../constants';

// export enum TimeFilter {
//     THIS_WEEK = "thisWeek",
//     LAST_WEEK = "lastWeek",
//     TWO_WEEKS_AGO = "twoWeeksAgo",
// }

// export type WeekDaysResult = {
//     [key: string]: {
//         tomatoes: number;
//         focus: number;
//         paused: number;
//         stopped: number;
//         totalTime: number;
//     };
// };

// export interface SelectHookResult {
//     isOpen: boolean;
//     selectedItem: Item | undefined;
//     filteredTasks?: (historyData: Task[], selectedItem?: Item) => Task[];
//     tasksGroupedByDay?: WeekDaysResult;
//     toggle: () => void;
//     select: (item: Item) => void;
//     close: () => void;
// }

// export const useSelect = ({ intervalTime }: IStatistic): SelectHookResult => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState<Item | undefined>(intervalTime ? intervalTime[0] : undefined);
    
//     const historyData = useSelector((state: RootState) => state.history.data);

//     const filterDataByTime = (historyData: Task[], filter: TimeFilter): Task[] => {
//         let startDate: moment.Moment;
//         let endDate: moment.Moment;
//         switch (filter) {
//             case TimeFilter.THIS_WEEK:
//                 startDate = moment().startOf('week');
//                 endDate = moment();
//                 break;
//             case TimeFilter.LAST_WEEK:
//                 startDate = moment().subtract(1, 'week').startOf('week');
//                 endDate = moment().subtract(1, 'week').endOf('week');
//                 break;
//             case TimeFilter.TWO_WEEKS_AGO:
//                 startDate = moment().subtract(2, 'weeks').startOf('week');
//                 endDate = moment().subtract(2, 'weeks').endOf('week');
//                 break;
//             default:
//                 startDate = moment();
//                 break;
//         }
        
//         return historyData.filter(item => 
//             moment(item.started).isSameOrAfter(startDate) && 
//             moment(item.started).isSameOrBefore(endDate)
//         );  
//     };

//     const filteredTasks = (historyData: Task[], selectedItem?: Item): Task[] => {
//         if (selectedItem && Object.values(TimeFilter).includes(selectedItem.id as TimeFilter)) {
//             return filterDataByTime(historyData, selectedItem.id as TimeFilter);
//         }
//         return [];
//     };
    
    
//     const groupTasksByDay = (tasks: Task[]): WeekDaysResult => {

//         const emptyDayData = {
//             tomatoes: 0,
//             focus: 0,
//             paused: 0,
//             stopped: 0,
//             totalTime: 0
//         };

//         const result: WeekDaysResult = {
//             'mon': { ...emptyDayData },
//             'tue': { ...emptyDayData },
//             'wed': { ...emptyDayData },
//             'thu': { ...emptyDayData },
//             'fri': { ...emptyDayData },
//             'sat': { ...emptyDayData },
//             'sun': { ...emptyDayData }
//         };
    
//         tasks.forEach(task => {
//             const dayOfWeek = moment(task.started).format('ddd').toLowerCase();;
//             if (result[dayOfWeek]) {
//                 result[dayOfWeek].tomatoes += 1;
//                 result[dayOfWeek].totalTime += moment(task.created).diff(task.started);
//                 result[dayOfWeek].paused += task.pausedTime;
//                 result[dayOfWeek].stopped += task.interruptions;
//             }

//             for (let day in result) {
//                 if (result[day].totalTime !== 0) {
//                     result[day].focus = Math.round((result[day].paused / result[day].totalTime) * 100);
//                 }
//             }
//         });
    
//         return result;
//     };
    

//     const tasksGroupedByDay = groupTasksByDay(filteredTasks(historyData, selectedItem)) || defaultTasksData;
//     //console.log(tasksGroupedByDay);

//     const toggle = () => {
//         setIsOpen((prevState) => !prevState);
//     };

//     const select = (item: Item) => {
//         setSelectedItem(item);
//         close();
//     };

//     const close = () => {
//         setIsOpen(false);
//     };

//     return {
//         isOpen,
//         selectedItem,
//         filteredTasks,
//         tasksGroupedByDay,
//         toggle,
//         select,
//         close,
//     };
// };

