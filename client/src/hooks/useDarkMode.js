import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

export const useDarkMode = () => useContext(ThemeContext)
