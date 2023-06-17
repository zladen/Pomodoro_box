import { useCallback, useEffect } from 'react'
import { Howl } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAlarmSound } from '../store/reducers/configSlice';
import beep from '../assets/sounds/beep.mp3';
import сuckoo from '../assets/sounds/сuckoo.mp3';
import bugle from '../assets/sounds/bugle.mp3';
import marimba from '../assets/sounds/marimba.mp3';
import police from '../assets/sounds/police.mp3';
import rynda from '../assets/sounds/rynda.mp3';
import shutdown_xp from '../assets/sounds/shutdown_xp.mp3';
import zero from '../assets/sounds/zero.mp3';

export const useSoundAlerts = () => {
    const config = useSelector((state: RootState) => state.config);
    const { playAlarmSound } = config;   
    const dispatch = useDispatch();

    const playAlarmSoundOnTickEnd = () => {
        const sounds = {
            beep,
            сuckoo,
            bugle,
            marimba,
            police,
            rynda,
            shutdown_xp,
            zero,
        };
          
        const soundObjKey = Object.keys(sounds).find((key) => key === playAlarmSound);
        const soundToPlay = sounds[soundObjKey as keyof typeof sounds];
      
        if (soundToPlay) {
            const sound = new Howl({
                src: [soundToPlay],
                loop: false,
            });
            sound.play();
        }
    };

    const handlePlaySound = useCallback(
        (newValue: string | boolean) => {
            dispatch(setAlarmSound(newValue));
        },
        [dispatch]
    );
    
    const handlePlaySoundChange = (e: { target: { value: string; }; }) => {
        const newSound = e.target.value;
        dispatch(setAlarmSound(newSound));
    };

    useEffect(() => {
        if (playAlarmSound === true) {
            dispatch(setAlarmSound('beep'));
        }
    })

    useEffect(() => {
        playAlarmSoundOnTickEnd();
    }, [playAlarmSound]);

    return {
        handlePlaySound,
        handlePlaySoundChange,
        playAlarmSound,
        beep, 
        сuckoo, 
        bugle, 
        marimba, 
        police, 
        rynda, 
        shutdown_xp,
        playAlarmSoundOnTickEnd
    }
}


