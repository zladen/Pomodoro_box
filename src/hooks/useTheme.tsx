import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme, RootState } from "../store/reducers/configSlice";

export const useTheme = () => {
	const themeMode = useSelector((state: RootState) => state.config.theme);
	const [theme, setTheme] = useState(themeMode);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(switchTheme({ theme }));
	}, [theme, dispatch]);

  	return { theme, setTheme };
};
