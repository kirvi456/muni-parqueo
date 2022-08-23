import React from 'react'
import { URLContext } from './URLContext'


type URLProviderProps = {
    children : JSX.Element
}


export const URLProvider : React.FC<URLProviderProps> = ({children}) => {
    
    const value = 'https://inventariobe.munisanjosepinula.info:8002/';
    
    return (
        <URLContext.Provider value={value}>
            { children }
        </URLContext.Provider>
    )
}
