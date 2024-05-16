import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Context provider for managing the visibility of a popup component.
 * 
 * This context provider manages the state of the popup visibility based on the current location.
 * It provides functions to show and hide the popup.
 * 
 * @param {object} children - The child components wrapped by the PopupProvider.
 * @returns {JSX.Element} Popup context provider component.
 */


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
