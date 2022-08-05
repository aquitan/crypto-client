import {createContext, useContext, useState} from "react";

export const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        console.log('theme', theme)
        setTheme(prevState => prevState === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}