import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from './modalSettings.module.scss'
import Toggle from '../Toggle/Toggle';
import { useForm } from 'react-hook-form';
import { Setting, settingPomodoro } from "../../store/reducers/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers/tasksSlice";
import { Button } from "../Button/Button";


export interface IModalSetting {
    onClose?: () => void;
} 

export function ModalSetting({onClose}: IModalSetting) {
    const setting = useSelector((state: RootState) => state.settings);
    //console.log(setting);
    const {pomodoro, shortBreak, longBreak} = setting;
    const { register, watch } = useForm({
        // defaultValues: {
        //     pomodoro: 25,
        //     shortBreak: 5,
        //     longBreak: 15,   
        // }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(settingPomodoro({
            pomodoro: watch('pomodoro') || pomodoro,
            shortBreak: watch('shortBreak') || shortBreak,
            longBreak: watch('longBreak') || longBreak,
        }));
    }, [dispatch, watch, pomodoro, shortBreak, longBreak]);

    
    //const P = watch('longBreak');
    //console.log(setting.pomodoro);

    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                navigate('/');
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }

    }, []);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const logState = (state: boolean) => {
        console.log("Toggled:", state)
    }
    
    const node = document.querySelector('#modal_root');
    if (!node) return null;

    return ReactDOM.createPortal((
        <div className={styles.modalBackdrop}>
            <div className={styles.modalSettings}>
                <div className={styles.headerSettings}>
                    <h3 className={styles.modalTitle}>Настройки</h3>
                </div>
                <h3 className={styles.titleSetting}>Таймер</h3>
                <form className={styles.formSettings} > {/* onSubmit={handleSubmit(onSubmit)} */}
                    <div className={styles.itemForm}>
                        <label>Помидор</label>
                        <input
                            className={styles.settingsTime}
                            {...register("pomodoro")}
                            placeholder='25'
                            onChange={(e) =>
                                dispatch(settingPomodoro({ pomodoro: +e.target.value }))  // обновление значени�� в Redux при изменении
                            }
                        />
                    </div>

                    <div className={styles.itemForm}>
                        <label>Короткий перерыв</label>
                        <input className={styles.settingsTime} 
                            {...register("shortBreak")}
                            placeholder="5"
                            onChange={(e) =>
                                dispatch(settingPomodoro({ shortBreak: +e.target.value }))  // обновление значени�� в Redux при изменении
                            }
                        />
                    </div>
                    
                    <div className={styles.itemForm}>
                        <label>Длинный перерыв</label>
                        <input className={styles.settingsTime} 
                            {...register("longBreak")}
                            placeholder="15"
                            onChange={(e) =>
                                dispatch(settingPomodoro({ longBreak: +e.target.value }))  // обновление значени�� в Redux при изменении
                            }
                        />
                    </div>

                    <div className={styles.autoStartPomodoro}>
                        {/* <span>Автостарт для помидора</span> */}
                        <Toggle toggled={true} onClick={logState} label="автостарт"/>
                    </div>
                    
                    <div className={styles.autoStartPomodoro}>
                        <span>Автостарт для перерыва</span>
                        <Toggle toggled={true} onClick={logState}/>
                    </div>

                    <div className={styles.autoStartPomodoro}>
                        <span>Автостарт для перерыва</span>
                        <Toggle toggled={true} onClick={logState}/>
                    </div>

                    <div className={styles.autoStartPomodoro}>
                        <span>Автостарт для помидора</span>
                        <Toggle toggled={true} onClick={logState}/>
                    </div>  
                    <div className={styles.btnBlock}>
                        <Button className={styles.btnSave} label='Закрыть' onClick={handleClose}/>
                    </div>
                </form>
                
            </div>
        </div>
           
    ), node);
}
