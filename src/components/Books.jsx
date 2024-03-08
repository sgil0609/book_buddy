import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Books() {
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
                setBooks(Array.isArray(data) ? data : data.books);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const viewBookDetails = (bookId) => {
        navigate(`/book-details/${bookId}`); 
    };

    const goHome = () => {
        navigate('/'); 
    };
    const goToAccount = () => {
        navigate('/account'); 
    };

    return (
        <div>
            <h1>All Books</h1>
            <button onClick={goHome}>Go Home</button> 
            <button onClick={goToAccount}>Account</button> 
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Available: {book.available}</p>
                        {book.coverimage && <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ maxWidth: '200px', maxHeight: '300px' }} />}
                        <button onClick={() => viewBookDetails(book.id)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Books;
