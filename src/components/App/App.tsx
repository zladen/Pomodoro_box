import { useEffect, useState } from "react";
import { Header } from "../Header"
import { Pomodoro } from "../Pomodoro"
import { useTheme } from "../../hooks/useTheme";
import { ModalRemoveTask } from "../ModalRemoveTask";

function App() {
	const { theme } = useTheme();
	const [isModalOpened, setIsModalOpened] = useState(false);
	
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
		</>	
	)
}

export default App
