import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Checkout() {
    const { bookId } = useParams(); // Extract bookId from URL parameters
    const navigate = useNavigate();
    const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkoutBook = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No access token found");
                return;
            }
            try {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        available: false,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to checkout the book');
                }

                setIsCheckoutComplete(true);

            } catch (error) {
                setError(error.message);
            }
        };

        checkoutBook();
    }, [bookId, navigate]);

    if (error) {
        return <div>Error during checkout: {error}</div>;
    }

    return (
        <div>
            {isCheckoutComplete ? (
                <div>
                    <p>Checkout complete!</p>
                    <button onClick={() => navigate(`/account`)}>Go to Account</button>
                    <button onClick={() => navigate(`/books`)}>Go to Books</button>
                </div>
            ) : (
                <p>Checking out the book...</p>
            )}
        </div>
    );
}

export default Checkout;
