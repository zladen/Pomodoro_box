import { TFunction } from 'i18next';

export type WeekDaysResult = {
    [key: string]: {
        tomatoes: number;
        focus: number;
        paused: number;
        stopped: number;
        totalTime: number;
    };
};
export interface IntervalTimeProps {
    id: string;
    value: string;
}

export const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const defaultStatisticData: WeekDaysResult = {
    'mon': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'tue': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'wed': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'thu': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'fri': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'sat': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 },
    'sun': { tomatoes: 0, focus: 0, paused: 0, stopped: 0, totalTime: 0 }
};

export function getIntervalTime(t: TFunction): IntervalTimeProps[] {
    return [
        { id: 'thisWeek', value: t("this_week") },
        { id: 'lastWeek', value: t("last_week") },
        { id: 'twoWeeksAgo', value: t("two_weeks_ago") },
    ];
}