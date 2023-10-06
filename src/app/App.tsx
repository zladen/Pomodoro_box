import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useShowAlerts } from "../hooks/useShowAlerts";
import { ModalPopup } from "../features/Modal/ModalPopup/ModalPopup";
import { Header } from "../features/Common/Header/Header";
import { ModalRemoveTask } from "../features/Modal/ModalRemoveTask/ModalRemoveTask";
import { Pomodoro } from "../features/PomodoroPage/Pomodoro/Pomodoro";

function App() {
	const { theme } = useTheme();
	const [isModalOpened, setIsModalOpened] = useState(false);
	const { showAlert, handleClose } = useShowAlerts();

	useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

	return (
		<>
			<Header />
			<Pomodoro />
			{isModalOpened && (
                <ModalRemoveTask onClose={() => { setIsModalOpened(false); }} />
            )}
			{showAlert && <ModalPopup onClose={handleClose} />}
		</>	
	)
}

export default App;
