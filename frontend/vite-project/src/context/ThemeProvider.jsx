import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}

const ThemeProvider = ({children}) => {

    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    }

    const theme = isDark ? 'dark' : 'light';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    },[isDark])

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;