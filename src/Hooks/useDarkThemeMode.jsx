import { useState } from "react"

const useDarkThemeMode = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    const toggleTheme = () => setIsDarkTheme(!isDarkTheme)
   
    return {isDarkTheme, toggleTheme}
}

export default useDarkThemeMode