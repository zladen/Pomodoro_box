import styles from "./theme.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, switchTheme } from "../../../store/reducers/themeSlice";
import { useCallback, useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";

export const Theme = () => {
    const { theme, setTheme } = useTheme();
    
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