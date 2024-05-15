import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

/**
 * FooterMenu is a functional component responsible for rendering the footer menu of the website.
 * It includes information about the company, links to different sections of the website, and social media links.
 * 
 * @returns {JSX.Element} JSX element representing the FooterMenu component.
 */

export function FooterMenu() {
    return (
        <footer className="footer flex-row">
            <div className="footer-column flex-column">
                <div className="footer-heading">WasteIT ApS</div>
                <div className="footer-item">Addresse: Sundkrogsgade 11</div>
                <div className="footer-item">2100 Copenhagen E</div>
                <div className="footer-item">CVR: 65305216</div>
            </div>
            
            <div className="footer-column flex-column">
                <a href="/" className="footer-link-item">About us</a>
                <a href="/" className="footer-link-item">Contact us</a>
            </div>

            <div className="footer-column flex-column">
                <a href="/" className="footer-link-item">FAQ</a>
                <a href="/" className="footer-link-item">Terms and conditions</a>
                <a href="/" className="footer-link-item">Privacy policy</a>
            </div>

            <div className="footer-column flex-column">
                <div className="footer-heading" style={{margin: '0 auto'}}>Follow us</div>
                <div className="footer-socials">
                    <a href="/" className="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="/" className="social-icon">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="/" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                </div>
            </div>
        </footer>
    );
}