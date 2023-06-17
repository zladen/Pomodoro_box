import { useEffect, useState } from "react";
import { Header } from "../Header"
import { Pomodoro } from "../Pomodoro"
import { useTheme } from "../../hooks/useTheme";
import { ModalRemoveTask } from "../ModalRemoveTask";
import { useShowAlerts } from "../../hooks/useShowAlerts";
import { ModalPopup } from "../ModalPopup/ModalPopup";

function App() {
	const { theme } = useTheme();
	const [isModalOpened, setIsModalOpened] = useState(false);
	const { showAlert, handleClose, handleAlerts } = useShowAlerts();

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
