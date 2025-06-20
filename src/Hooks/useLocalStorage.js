import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : initialValue
        } catch (err) {
            console.error("Error reading from from localstorage", err)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (err) {
            console.error("Error saving to localStorage", err);
            
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}
export default useLocalStorage