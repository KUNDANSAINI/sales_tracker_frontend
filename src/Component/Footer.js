// Footer.js

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container text-center">
                <span className="text-muted">© {new Date().getFullYear()} BhoomiPlus Online & Offline Marketing Pvt. Ltd.</span>
                <br />
                <span className="text-muted">Address: Ward no. 56, Near Panchmukhi Balaji mandir, Mandrella road, Jhunjhunu, Rajasthan, 333001</span>
                <br />
                <span className="text-muted">Phone: 01592294009 | Email: help@bhoomiplus.com</span>
            </div>
        </footer>
    );
}

export default Footer;
