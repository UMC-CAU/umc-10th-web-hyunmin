import {THEME, useTheme} from './context/ThemeProvider';

export default function ThemeToggleButton() {
    const {theme, toggleTheme} = useTheme(); //theme이랑 toggleTheme가져옴
    const isLightMode = theme === THEME.LIGHT;

    return <button
        onClick={toggleTheme} //클릭하면 theme 바뀜
        style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            border: "none",
            cursor: "pointer",
            backgroundColor: isLightMode ? "#000" : "#fff",
            color: isLightMode ? "#fff" : "#000",
        }}>
        {isLightMode ? '다크모드' : '라이트모드'}
    </button>;
}