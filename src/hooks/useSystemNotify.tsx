import { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { setNotify } from '../store/reducers/configSlice';
import { useTranslation } from 'react-i18next';

export const useSystemNotify = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const systemNotify = (message: string) => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(t("notification"), {
                        body: message,
                    });
                }
            });
        }
    }

    const handleNotify = useCallback(
        (newValue: string | boolean) => {
            dispatch(setNotify(newValue));
            if (newValue) {
                systemNotify(t("setting_saved"));
            }
        },
        [dispatch]
    );

    return {
        systemNotify,
        handleNotify
    }
}

