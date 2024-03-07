import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

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
                setBooks(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    // Placeholder function for checkout action
    const handleCheckout = (bookId) => {
        console.log(`Checkout book with ID: ${bookId}`);
        // Here, you might navigate to a checkout page or directly call an API to checkout the book
    };

    return (
        <div>
            <h1>All Books</h1>
            <ul style={{ listStyleType: 'none' }}>
                {books.map((book, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            {book.coverImage && <img src={book.coverImage} alt={`Cover of ${book.title}`} style={{ maxWidth: '100px', maxHeight: '150px' }} />}
                            <span>{book.title}</span>
                        </div>
                        <div>
                            {/* See More button navigates to the book details */}
                            <button onClick={() => navigate(`/books/${book.id}`)}>See More</button>
                            {/* Checkout button */}
                            <button onClick={() => handleCheckout(book.id)}>Checkout</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Account;
