import { useEffect } from 'react';
import { usePopup } from './PopupProvider';
import { useLocation } from 'react-router-dom';

/**
 * Hook for triggering a popup when a specific key is pressed, except on the '/Report' page.
 * 
 * This hook listens for keydown events and triggers the popup when the 'y' key is pressed,
 * but only if the current location is not '/Report'.
 * 
 * @returns {null} Null, as this hook does not return any JSX.
 */


export const useKeyboardPopup = () => {
    const { showPopup } = usePopup();
    const location = useLocation();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'y' && location.pathname !== '/Report') {
                showPopup();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPopup, location.pathname]);

    return null;
};
