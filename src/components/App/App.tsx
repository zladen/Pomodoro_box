import { useEffect } from "react";
import { Header } from "../Header"
import { Pomodoro } from "../Pomodoro"
import { useTheme } from "../../hooks/useTheme";
import { useAutoStartBreak } from "../../hooks/useAutoStartBreak";
import { useDispatch } from "react-redux";
import { toggleAutoStartBreak } from "../../store/reducers/configSlice";

function App() {
	const { theme } = useTheme();
	
	useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

	return (
		<>
			<Header />
			<Pomodoro />
		</>	
	)
}

export default App
