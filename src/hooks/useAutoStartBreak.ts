import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAutoStartBreak, RootState } from "../store/reducers/configSlice";

export const useAutoStartBreak = () => {
	const autoStartBreak  = useSelector((state: RootState) => state.config.autoStartBreak);
	const [autoStart, setAutoStart] = useState(autoStartBreak);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleAutoStartBreak(autoStart));
	}, [autoStart, dispatch]);
    
  	return { autoStart, setAutoStart };
};

