import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        // Check for token presence in local storage
        const token = localStorage.getItem('token');
        if (token) {
            // Simple presence check, considering a token means user is logged in
            setHasToken(true);
        }
    }, []); // Runs once on component mount

    return (
        <div>
            <h1>Welcome to the library</h1>
            {
                hasToken ?
                <>
                    <Link to="/account" className="my-account-button">My Account</Link>
                    <br />
                    <Link to="/Books" className="view-books">View Books</Link>
                </> :
                <>
                    <Link to="/signup" className="sign-up-button">Sign Up Here!</Link>
                    <br />
                    <Link to="/login" className="login-button">Login</Link>
                </>
            }
        </div>
    );
}
