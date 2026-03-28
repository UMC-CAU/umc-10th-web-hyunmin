import {createContext, type PropsWithChildren, useState, useContext} from "react";

export enum THEME {
    LIGHT='LIGHT',
    DARK='DARK' }

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
//Provider 컴포넌트 -> children에게 theme이랑 toggleTheme 내려줌
export const ThemeProvider = ({children}: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT); //초깃값 light

    //테마바꾸는 함수
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme == THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        )); //light면 dark로, dark면 light로
    }

    return (
        <ThemeContext.Provider value={{theme: theme, toggleTheme: toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider') //Provider밖에서 쓰면 에러
    }
    return context;
}