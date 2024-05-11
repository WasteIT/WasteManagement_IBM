import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const showPopup = () => setIsVisible(true);
    const hidePopup = () => setIsVisible(false);

    return (
        <PopupContext.Provider value={{ isVisible, showPopup, hidePopup }}>
            {children}
        </PopupContext.Provider>
    );
};
