import { useTranslation } from 'react-i18next';

export function formatedDuration(ms: number): string {
    const { t } = useTranslation();
    let hours = Math.floor(ms / 1000 / 60 / 60 / 60);
    let minutes = Math.floor( (ms / 1000 / 60 / 60 ) % 60 );
    let result = "";

    const chooseLocalizedWord = (num: number, one: string, few: string, many: string) => {
        if (num === 1 || num === 21) return `${num} ${t(one)}`;
        if (num >= 2 && num <= 4 || num % 10 >= 2 && num % 10 <= 4) return `${num} ${t(few)}`;
        return `${num} ${t(many)}`;
    };

    if (hours) {
        result += chooseLocalizedWord(hours, "hour", "hours", "hours2");
    }

    if (minutes) {
        if (result) result += " ";  
        result += chooseLocalizedWord(minutes, "minute", "minutes", "minutes2");
    }

    return result;
}