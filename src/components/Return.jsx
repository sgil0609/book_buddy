import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Return() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isReturnComplete, setIsReturnComplete] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const returnBook = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No access token found");
                return;
            }
            try {

                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        available: true,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to return the book');
                }

                setIsReturnComplete(true);

            } catch (error) {
                setError(error.message);
            }
        };

        returnBook();
    }, [id]);

    if (error) {
        return <div>Error during return: {error}</div>;
    }

    return (
        <div>
            {isReturnComplete ? (
                <div>
                    <p>Return complete!</p>
                    <button onClick={() => navigate(`/account`)}>Go to Account</button>
                    <button onClick={() => navigate(`/books`)}>Go to Books</button>
                </div>
            ) : (
                <p>Returning the book...</p>
            )}
        </div>
    );
}

export default Return;
