import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAutoStartBreak, RootState } from "../store/reducers/configSlice";

export const useSoundAlerts = () => {
	const soundAlerts  = useSelector((state: RootState) => state.config.soundAlerts);
	const [autoStart, setAutoStart] = useState(soundAlerts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleAutoStartBreak(autoStart));
	}, [autoStart, dispatch]);
    
  	return { autoStart, setAutoStart };
};