import { useEffect } from 'react';
import { usePopup } from './PopupProvider';

export const useKeyboardPopup = () => {
    const { showPopup } = usePopup();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'y') {
                showPopup();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPopup]);

    return null;
};
