
type FormatMode = "tomatoMade" | "totalTime" | "totalTimeWork" | "totalTimePaused";

export function universalFormatter(num: number, mode: FormatMode, t: (key: string) => string): string {

    const chooseLocalizedWord = (count: number, one: string, few: string, many: string): string => {
        if (count % 10 === 1 && count % 100 !== 11) return `${count} ${one}`;
        if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) return `${count} ${few}`;
        return `${count} ${many}`;
    
    };

    if (mode === "tomatoMade") {
        return chooseLocalizedWord(num, t("tomato"), t("tomato2"), t("tomatoes"));
    }

    const hours = Math.floor(num / (1000 * 60 * 60));
    const minutes = Math.floor((num / (1000 * 60)) % 60);
    let result = '';

    if (hours) {
        if (mode === 'totalTimePaused') {
            result += chooseLocalizedWord(hours, t("h"), t("h"), t("h"))
        } else if (mode === "totalTime") {
            result += chooseLocalizedWord(hours, t("hour"), t("hours"), t("hours2"));
        } else {
            result += chooseLocalizedWord(hours, t("hours"), t("hours2"), t("hours2"));
        }
    }

    if (minutes) {
        if (hours) {
            result += " ";
        } 

        if (mode === 'totalTimePaused') {
            result += chooseLocalizedWord(minutes, t("m"), t("m"), t("m"));
        } else if (mode === "totalTime") {
            result += chooseLocalizedWord(minutes, t("minute"), t("minutes"), t("minutes2"));
        } else {
            result += chooseLocalizedWord(minutes, t("minutes"), t("minutes2"), t("minutes2"));
        }
    }

    return result.trim();
}
