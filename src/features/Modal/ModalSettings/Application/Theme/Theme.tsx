import styles from "./theme.module.scss";
import { useCallback, useEffect } from "react";
import { useTheme } from "../../../../../hooks/useTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/reducers/configSlice";
import { useSystemNotify } from "../../../../../hooks/useSystemNotify";
import { useTranslation } from "react-i18next";

export const Theme = () => {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { notify } = useSelector((state: RootState) => state.config);
    const { systemNotify } = useSystemNotify();
    
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);
    
    const setDarkMode = useCallback(() => {
        setTheme("dark");
    }, [setTheme]);
    
    const setLightMode = useCallback(() => {
        setTheme("light");
    }, [setTheme]);
    
    const handleToggleTheme = useCallback((event: { target: { checked: boolean } }) => {
        event.target.checked ? setDarkMode() : setLightMode();
        if (notify) {
            systemNotify(t("setting_saved"))
        }
    }, [setDarkMode, setLightMode]);

    return (
        <div className={styles.darkMode}>
            <input
                className={styles.darkModeInput}
                type='checkbox'
                id='darkmode-toggle'
                onChange={handleToggleTheme}
                checked={theme === "dark"}
            />
            <label className={styles.darkModeLabel} htmlFor='darkmode-toggle'>
            </label>
        </div>
    );
};

export default Theme;