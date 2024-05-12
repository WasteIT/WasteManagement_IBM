import { useEffect } from 'react';
import { usePopup } from './PopupProvider';
import { useLocation } from 'react-router-dom';

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
