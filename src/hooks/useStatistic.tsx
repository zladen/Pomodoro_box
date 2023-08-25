import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/configSlice';
import { Task } from '../store/reducers/historySlice';
import { IntervalTimeProps, WeekDaysResult, defaultStatisticData } from '../constants';
import moment from 'moment';

export enum TimeFilter {
    THIS_WEEK = "thisWeek",
    LAST_WEEK = "lastWeek",
    TWO_WEEKS_AGO = "twoWeeksAgo",
}

interface UseStatisticProps {
    selectedInterval: IntervalTimeProps;
}

export const useStatistic = ({selectedInterval}: UseStatisticProps) => {
    
    const historyData = useSelector((state: RootState) => state.history.data);

    const filterDataByTime = (historyData: Task[], filter: TimeFilter): Task[] => {
        let startDate: moment.Moment;
        let endDate: moment.Moment;
        switch (filter) {
            case TimeFilter.THIS_WEEK:
                startDate = moment().startOf('week');
                endDate = moment();
                break;
            case TimeFilter.LAST_WEEK:
                startDate = moment().subtract(1, 'week').startOf('week');
                endDate = moment().subtract(1, 'week').endOf('week');
                break;
            case TimeFilter.TWO_WEEKS_AGO:
                startDate = moment().subtract(2, 'weeks').startOf('week');
                endDate = moment().subtract(2, 'weeks').endOf('week');
                break;
            default:
                startDate = moment();
                break;
        }
        
        return historyData.filter(item => 
            moment(item.started).isSameOrAfter(startDate) && 
            moment(item.started).isSameOrBefore(endDate)
        );  
    };

    const filteredTasks = (historyData: Task[], selectedItem?: IntervalTimeProps): Task[] => {
        if (selectedItem && Object.values(TimeFilter).includes(selectedItem.id as TimeFilter)) {
            return filterDataByTime(historyData, selectedItem.id as TimeFilter);
        }
        return [];
    };
    
    const groupTasksByDay = (tasks: Task[]): WeekDaysResult => {
        const result: WeekDaysResult = {
            'mon': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
            'tue': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
            'wed': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
            'thu': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
            'fri': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
            'sat': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
            'sun': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 }
        };
    
        tasks.forEach(task => {
            const dayOfWeek = moment(task.started).format('ddd').toLowerCase();;
            if (result[dayOfWeek]) {
                result[dayOfWeek].tomatoes += 1;
                result[dayOfWeek].totalTime += moment(task.created).diff(task.started);
                result[dayOfWeek].paused += task.pausedTime;
                result[dayOfWeek].stopped += task.interruptions;
            }

            for (let day in result) {
                if (result[day].totalTime !== 0) {
                    result[day].focus = Math.round((result[day].paused / result[day].totalTime) * 100);
                }
            }
        });
    
        return result;
    };
    
    const tasksGroupedByDay = groupTasksByDay(filteredTasks(historyData, selectedInterval)) || defaultStatisticData;

    return {
        tasksGroupedByDay
    };
};