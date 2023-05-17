import moment from 'moment';
import 'moment-timezone';
import styles from './timeZone.module.scss';
import { useState } from 'react';
import Locale from '../../Locale/Locale';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';

// export const TimeZone = () => {
//     //const zones = moment().tz("Russia/Moscow");
//     //console.log(zones);
//     const timeZones = moment.tz.names().map((timeZone) => {
//         const formattedOffset = moment().tz(timeZone).format('Z');
//         const city = timeZone.split('/')[1];
//         return { offset: formattedOffset, city: city, id: timeZone };
//     });

//     timeZones.sort((a, b) => parseFloat(a.offset) - parseFloat(b.offset));

//     return (
//         <select className={styles.timeZone}>
//             {timeZones.map(timeZone => (
//                 <option key={timeZone.id} value={timeZone.id}>{`(UTC${timeZone.offset}) ${timeZone.city}`}</option>
//             ))}
//         </select>
//     );
// };

export const TimeZone = () => {
    const { t } = useTranslation();
    const [defaultZone, setDefaultZone] = useState("Europe/Moscow");
    const [defaultFormatDate, setDefaultFormatDate] = useState("DD.MM.YYYY");
    const [defaultFormatTime, setDefaultFormatTime] = useState("24");

    //let selectedTimeZone = moment.tz.guess();

    //let formats = moment.localeData().longDateFormat();
    //console.log(formats);

    //console.log(moment().format('DD.MM.YYYY'));

    const defaultTimeZone = moment.tz.setDefault(defaultZone);
    const timeZones = moment.tz.names().map((timeZone) => {
        const formattedOffset = moment().tz(timeZone).format('Z');
        const city = timeZone.split('/')[1];
        //console.log(formattedOffset);
        // if (!city) {
        //     return null;
        // }
        return { offset: formattedOffset, city: city, id: timeZone };
    }).filter((tz) => tz !== null);

    timeZones.sort((a, b) => parseFloat(a.offset) - parseFloat(b.offset));

    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.formatDate}>
                <label>{t("language")}</label> 
                <Locale />
            </div>

            <div className={styles.formatDate}>
                <label>{t("time_zone")}</label>
                <select className={styles.timeZone} defaultValue={defaultZone}>
                    {timeZones.map(timeZone => (
                        <option key={timeZone.id} value={timeZone.id}>{`(UTC${timeZone.offset}) ${timeZone.city}`}</option>
                    ))}
                </select>
            </div>
            
            <div className={styles.formatDate}>
                <label>{t("date_format")}</label>
                <select  className={styles.timeZone} defaultValue={defaultFormatDate}>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="DD.MM.YYYY">DD.MM.YYYY</option>
                    <option value="YYYY.MM.DD">YYYY.MM.DD</option>
                    <option value="YYYY-MM-DD">YYYY.MM.DD</option>
                </select>
            </div>
            
            <div className={styles.formatDate}>
                <label>{t("time_format")}</label>        
                <select  className={styles.timeZone} defaultValue={defaultFormatTime}>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </select>
            </div>
        </I18nextProvider>
    );
};



