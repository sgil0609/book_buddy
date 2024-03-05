import React, { useState, useEffect } from 'react';

function Account() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No access token found");
                return;
            }

            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com//api/books', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Account</h1>

        </div>
    );
}

export default Account;
