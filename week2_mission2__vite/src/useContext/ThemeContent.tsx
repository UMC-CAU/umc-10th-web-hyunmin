import {THEME, useTheme} from './context/ThemeProvider';

export default function ThemeContent() {
    const {theme} = useTheme(); //현재 테마 가져옴
    const isLightMode = theme === THEME.LIGHT;

    return (
        <main style={{
            minHeight: "calc(100vh - 64px)", //Navbar 높이 빼고 남은 공간
            width: "100vw", // 화면 전체 폭
            padding: "2rem",
            backgroundColor: isLightMode ? "#fff" : "#333", // 배경: 라이트모드면 흰색, 다크모드면 어두운 회색
            color: isLightMode ? "#000" : "#fff", //글자: 검정색, 흰색
        }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ThemeContent</h1>
        </main>
    );
}