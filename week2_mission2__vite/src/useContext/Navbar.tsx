import { THEME, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from "./ThemeToggleButton.tsx";

export default function Navbar() {
    const {theme} = useTheme(); //context에서 theme 가져옴
    const isLightMode = theme === THEME.LIGHT; // 현재 light인지 확인

    return (
        <nav style={{
            padding: "1rem",
            width: "100%", //너비 전체
            backgroundColor: isLightMode ? "#fff" : "#333",
            color: isLightMode ? "#000" : "#fff",
            textAlign: "right",
        }}>
            <ThemeToggleButton /> {/*버튼 눌러서 theme 바꾸기*/}
        </nav>
    );
}