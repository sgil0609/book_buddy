import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        // Check for token presence in local storage
        const token = localStorage.getItem('token');
        if (token) {
            // Simple presence check, you might want to add more validation logic
            setHasToken(true);
        }
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <div>
            <h1>Welcome to the library</h1>
            {
                hasToken ?
                <Link to="/my-account" className="my-account-button">My Account</Link> :
                <Link to="/signup" className="sign-up-button">Sign Up Here!</Link>
            }
        </div>
    );
}
