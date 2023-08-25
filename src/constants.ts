export type WeekDaysResult = {
    [key: string]: {
        tomatoes: number;
        focus: number;
        paused: number;
        stopped: number;
        totalTime: number;
    };
};

export const defaultStatisticData: WeekDaysResult = {
    'mon': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'tue': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'wed': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'thu': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'fri': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'sat': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'sun': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 }
};

export interface IntervalTimeProps {
    id: string;
    value: string;
}

export const intervalTime: IntervalTimeProps[] = [
    { id: 'thisWeek', value: 'Эта неделя' },
    { id: 'lastWeek', value: 'Прошедшая неделя' },
    { id: 'twoWeeksAgo', value: '2 недели назад' },
];