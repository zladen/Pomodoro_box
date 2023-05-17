import { I18nextProvider, useTranslation } from 'react-i18next';
import styles from './instructions.module.scss'
import i18n from '../../i18n';

export function Instructions() {
    const { t } = useTranslation();
    return (
        <>
            <I18nextProvider i18n={i18n}>
                <h2 className={styles.title}>{t("title_desc")}:</h2>
                <div className={styles.desc}>
                    <ul className={styles.descItems}>
                        <li>{t("select_category")}</li>
                        <li>{t("start_timer")}</li>
                        <li>{t("work_timer")}</li>
                        <li>{t("long_break_descr")}</li>
                        <li>
                            {t("keep_working1")}
                            <br/>{t("keep_working2")}.
                        </li>
                    </ul>
                </div>
            </I18nextProvider>
        </>  
    )
}