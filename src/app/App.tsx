import { useEffect, useState } from "react";
import { Header } from "../features/Common/Header"
import { Pomodoro } from "../features/PomodoroPage/Pomodoro"
import { useTheme } from "../hooks/useTheme";
import { ModalRemoveTask } from "../features/Modal/ModalRemoveTask";
import { useShowAlerts } from "../hooks/useShowAlerts";
import { ModalPopup } from "../features/Modal/ModalPopup/ModalPopup";

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
