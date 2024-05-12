import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        
        if (location.pathname === '/Report') {
            setIsVisible(false);
        }
    }, [location.pathname]);

    const showPopup = () => setIsVisible(true);
    const hidePopup = () => setIsVisible(false);



    return (
        <PopupContext.Provider value={{ isVisible, showPopup, hidePopup }}>
            {children}
        </PopupContext.Provider>
    );
};
