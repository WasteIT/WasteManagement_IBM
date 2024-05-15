import React, { useState, useContext } from 'react';
import { usePopup } from './PopupProvider'; 
import { Link } from 'react-router-dom';
import UserContext from '../../utils/UserContext';

/**
 * Popup component displays a popup message to notify the user about the completion of an optimization report.
 * It provides a button to navigate to the report page.
 * 
 * @returns {JSX.Element} The JSX element representing the Popup component.
 */

export const Popup = () => {
    const { isVisible, hidePopup } = usePopup();
    const [isHovering, setIsHovering] = useState(false);
    const { streetName } = useContext(UserContext);

    if (!isVisible) return null;

    const style = {
        position: 'absolute',
        top: '75%',
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
        cursor: 'pointer',
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
        cursor: 'pointer',
        zIndex: '1001'
    };
   
    return (
        <Link to="/Report" style={{ textDecoration: 'none' }} state={{ name: streetName }}>
            <div style={style}>
                <div style={arrowStyle}></div>
                <button 
                    style={closeButtonStyle}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        hidePopup();
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Close">
                    &times;
                </button>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Optimization Report Complete</h2>
                <p style={{ fontSize: '16px' }}>Your optimization report is done. Click here to watch.</p>
            </div>
        </Link>
    );
};

export default Popup;
