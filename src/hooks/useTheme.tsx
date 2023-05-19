import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, switchTheme } from "../store/reducers/themeSlice";

export const useTheme = () => {
	const themeMode = useSelector((state: RootState) => state.theme.theme);
	const [theme, setTheme] = useState(themeMode);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(switchTheme({ theme }));
	}, [theme, dispatch]);

  	return { theme, setTheme };
};
