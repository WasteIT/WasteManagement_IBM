import React, { useState } from 'react';
import { usePopup } from './PopupProvider'; 

export const Popup = () => {
    const { isVisible, hidePopup } = usePopup();
    const [isHovering, setIsHovering] = useState(false);

    if (!isVisible) return null;

    const style = {
        position: 'fixed',
        top: '8%',
        left: '50.5%',
        zIndex: '1000',
        width: 'auto',
        minWidth: '320px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd', 
        textAlign: 'center',
        color: '#333',
        cursor: 'default',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    };

    const arrowStyle = {
        position: 'absolute',
        top: '-10px',
        left: '10px',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #fff'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '0',
        background: 'transparent',
        border: 'none',
        color: isHovering ? '#F00' : '#aaa',
        fontSize: '24px',
        cursor: 'pointer'
    };

    return (
        <div style={style}>
            <div style={arrowStyle}></div>
            <button 
                style={closeButtonStyle}
                onClick={hidePopup}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label="Close">
                &times;
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Optimization Report Complete</h2>
            <p style={{ fontSize: '16px' }}>Your optimization report is done. Click here to watch.</p>
        </div>
    );
};

export default Popup;
