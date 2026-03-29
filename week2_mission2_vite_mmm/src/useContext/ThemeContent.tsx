import {THEME, useTheme} from './context/ThemeProvider';

export default function ThemeContent() {
    const {theme} = useTheme(); // 현재 테마 가져옴
    const isLightMode = theme === THEME.LIGHT;

    return (
        <main style={{
            minHeight: "calc(100vh - 64px)", //Navbar 높이 빼고 남은 공간
            width: "100vw", //화면 전체 폭
            padding: "2rem",
            backgroundColor: isLightMode ? "#fff" : "#333",
            color: isLightMode ? "#000" : "#fff",
        }}>
            <h1 style={{ fontSize: "2rem",
                fontWeight: "bold",
                color: isLightMode ? "#000" : "#fff"
            }}>
                Theme Content</h1>
        </main>
    );
}