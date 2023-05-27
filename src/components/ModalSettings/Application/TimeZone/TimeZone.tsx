import moment from 'moment';
import 'moment-timezone';
import styles from './timeZone.module.scss';
import Locale from '../../Locale/Locale';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setDate, setTime, setTimeZone } from '../../../../store/reducers/configSlice';

export const TimeZone = () => {
    const { t } = useTranslation();
    const config = useSelector((state: RootState) => state.config);
    const {timezone, date, time} = config;
    const dispatch = useDispatch();

    const timeZones = moment.tz.names().map((timeZone) => {
        const formattedOffset = moment().tz(timeZone).format('Z');
        const city = timeZone.split('/')[1];

        return { offset: formattedOffset, city: city, id: timeZone };
    }).filter((tz) => tz.offset && tz.city && tz.id && !tz.city.includes('GMT'));

    timeZones.sort((a, b) => parseFloat(a.offset) - parseFloat(b.offset));

    const handleTimeZoneChange = (e: { target: { value: string; }; }) => {
        dispatch(setTimeZone(e.target.value));
    };

    const handleDateChange = (e: { target: { value: string; }; }) => {
        dispatch(setDate(e.target.value));
    };

    const handleTimeChange = (e: { target: { value: string; }; }) => {
        dispatch(setTime(e.target.value));
    };

    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.formatDate}>
                <label>{t("language")}</label> 
                <Locale />
            </div>

            <div className={styles.formatDate}>
                <label>{t("time_zone")}</label>
                <select className={styles.timeZone} 
                   defaultValue={timezone}
                   onChange={handleTimeZoneChange} 
    
                >
                    {timeZones.map(timeZone => (
                        <option key={timeZone.id} value={timeZone.id}>{`(UTC${timeZone.offset}) ${timeZone.city}`}</option>
                    ))}
                </select>
            </div>
            
            <div className={styles.formatDate}>
                <label>{t("date_format")}</label>
                <select 
                    className={styles.timeZone}
                    onChange={handleDateChange} 
                    defaultValue={date}
                >
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
                <select  
                    className={styles.timeZone} 
                    defaultValue={time}
                    onChange={handleTimeChange}   
                >
                    <option value="hh:mmA">12</option>
                    <option value="HH:mm">24</option>
                </select>
            </div>
        </I18nextProvider>
    );
};



