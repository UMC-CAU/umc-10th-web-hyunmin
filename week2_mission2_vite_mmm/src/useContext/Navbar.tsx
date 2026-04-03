import { THEME, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from "./ThemeToggleButton.tsx";

export default function Navbar() {
    const {theme} = useTheme();
    const isLightMode = theme === THEME.LIGHT; // 현재 LIGHT인지 확인

    return (
        <nav style={{
            padding: "1rem",
            width: "100%",
            backgroundColor: isLightMode ? "#fff" : "#333", //배경색: 라이트모드면 흰색, 다크모드면 어두운 회색
            color: isLightMode ? "#000" : "#fff", //글자색: 검정색, 흰색
            textAlign: "right",
        }}>
            <ThemeToggleButton /> {/* 버튼 눌러서 theme 바꾸기 */}
        </nav>
    );
}