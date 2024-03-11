import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No access token found");
                return;
            }
            try {
                setIsLoading(true);
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserData(data); 
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);
    const goToHome = () => navigate('/'); 
    const goToBooks = () => navigate('/books'); 
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div >
            <h2>My Account</h2>
            <button onClick={goToHome}>Home</button>
            <button onClick={goToBooks}>Books</button>
            <div className='details'>
            <p>Name: {userData?.firstname} {userData?.lastname}</p> 
            <p>Name: {userData?.email} </p> 
            </div>
            <h3>My Reservations:</h3>
            {userData?.books?.length > 0 ? (
                <ul>
                    {userData.books.map((reservation, index) => (
                        <li key={index}>
                            <h3>Book Title: {reservation.title}</h3>
                            <p>Book Author: {reservation.author}</p>
                            <button onClick={() => navigate(`/return/${reservation.id}`)}>Return</button>
                            {reservation.coverimage && <img src={reservation.coverimage} alt={`Cover of ${reservation.title}`} style={{ maxWidth: '200px', maxHeight: '300px' }} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
}

export default Account;
