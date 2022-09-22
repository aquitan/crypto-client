import {createContext, useContext, useState} from "react";

export const ValueContext = createContext()

export const useValueContext = () => useContext(ValueContext)

export const ValueContextProvider = ({children}) => {
    const [chartValue, setChartValue] = useState(0)
    const toggleValue = (val) => {
        setChartValue(val)
    }

    return (
      <ValueContext.Provider value={{chartValue, toggleValue}}>
          {children}
      </ValueContext.Provider>
    )
}