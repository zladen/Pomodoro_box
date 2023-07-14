import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers/tasksSlice";
import { useTick } from "./useTick";
import { useCallback, useEffect, useState } from "react";
import { ModalPopup } from "../components/ModalPopup/ModalPopup";
import { setAlerts } from "../store/reducers/configSlice";

// export const useShowAlerts = () => {
//     const { notify_duration, alerts, playAlarmSound, notify } = useSelector((state: RootState) => state.config);
//     const { remains, mode, duration } = useSelector((state: RootState) => state.timer);
//     const [showAlert, setShowAlert] = useState(false);
//     const [message, setMessage] = useState('');
//     const dispatch = useDispatch();

//     const show = useCallback(() => {
//         setShowAlert(true);
//             if (notify_duration > 0) {
//                 setTimeout(() => {
//                     setShowAlert(false);
//                 }, notify_duration);
//             }
//     }, [notify_duration]);

//     const handleAlerts = useCallback(
//         (newValue: boolean) => {
//             dispatch(setAlerts(newValue));
//         },
//         [dispatch]
//     );

//     const showAlertModal = () => {
//         if (alerts) {
//             setShowAlert(true);
//         }
//     };

//     console.log(showAlert);

//     // const handleAlerts = useCallback(
//     //     (newValue: boolean) => {
//     //         dispatch(setAlerts(newValue));
//     //         if (alerts) {
//     //             setShowAlert(true);
//     //             console.log(showAlert);
//     //         }
//     //     },
//     //     [dispatch]
//     // );

//     const handleClose = useCallback(() => {
//         setShowAlert(false);
//     }, []);


//     return {
//         handleClose,
//         showAlertModal,
//         handleAlerts,
//         showAlert,
//         message
//     }
// }

export const useShowAlerts = () => {
    const { notify_duration, alerts, playAlarmSound, notify } = useSelector((state: RootState) => state.config);
    const { remains, mode, duration } = useSelector((state: RootState) => state.timer);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
  
    function showAlertModal() {
        setShowAlert(true);
    }
        
    const handleClose = useCallback(() => {
        setShowAlert(false);
    }, []);
  
    // const handleAlerts = useCallback(
    //     (newValue: boolean) => {
    //         dispatch(setAlerts(newValue));
    //         // if (newValue) {
    //         //     showAlertModal("Новое сообщение");
    //         // }
    //     },
    //     [dispatch, setShowAlert]
    // );

    function handleAlerts(newValue: boolean) {
        dispatch(setAlerts(newValue));
        //showAlertModal();
        setShowAlert(true);
    }

   //console.log(showAlert);

    useEffect(() => {
        if (alerts) {
            if (showAlert) {
                //setShowAlert(true);
                console.log(showAlert, alerts);
                if (notify_duration > 0) {
                    const timeout = setTimeout(() => {
                        setShowAlert(false);
                    }, notify_duration);
                    return () => clearTimeout(timeout);
                } else {
                    setShowAlert(false);
                }
            }
        } else {
            setShowAlert(false);
        }
    }, [alerts, notify_duration, setShowAlert]);
    
    // useEffect(() => {
    //     if (alerts) {
    //         setShowAlert(true);
    //         if (notify_duration > 0) {
    //         const timeout = setTimeout(() => {
    //             setShowAlert(false);
    //         }, notify_duration);
    
    //         return () => clearTimeout(timeout);
    //         }
    //     } else {
    //         setShowAlert(false);
    //     }
    // }, [alerts, notify_duration]);

    //console.log('alerts:', alerts, "showAlert:", showAlert)
    return {
        showAlert,
        handleClose,
        handleAlerts,
        showAlertModal,
    };
};