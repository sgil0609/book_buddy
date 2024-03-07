import React, { useState, useEffect } from 'react';

function Account() {
    const [books, setBooks] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No access token found");
                return;
            }

            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data); // Log to see the structure
                
                // Adjust according to the structure of your data
                setBooks(Array.isArray(data) ? data : data.books); // Example adjustment
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>All Books</h1>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        {book.coverimage && <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ maxWidth: '200px', maxHeight: '300px' }} />}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Account;
