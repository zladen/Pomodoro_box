import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./page404.module.scss"

export function Page404() {
    const location = useLocation();
    if (location.pathname === '/') {
        return null; // не рендерить компонент на странице с постами
    }
    
    return (
        <div>
            <p className={styles.error404}>Ошибка 404 — страница не найдена</p>
        </div>
    )
}