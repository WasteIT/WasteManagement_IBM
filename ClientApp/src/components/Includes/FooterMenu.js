import './Style.css'

export function FooterMenu() {
    return (
        <footer className="footer">
            <div className="footer-column">
                <div className="footer-heading">WasteIT ApS</div>
                <div className="footer-item">Addresse</div>
                <div className="footer-item">Copenhagen 2200</div>
                <div className="footer-item">CVR: xxxxxxxx</div>
            </div>
            
            <div className="footer-column">
                <a href="#" className="footer-link-item">About us</a>
                <a href="#" className="footer-link-item">Contact us</a>
            </div>

            <div className="footer-column">
                <a href="#" className="footer-link-item">FAQ</a>
                <a href="#" className="footer-link-item">Terms and conditions</a>
                <a href="#" className="footer-link-item">Privacy policy</a>
            </div>

            <div className="footer-column">
                <div className="footer-heading">Follow us</div>
                <div className="footer-socials">
                {/*<a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>*/}
                </div>
            </div>
            </footer>

    );
}