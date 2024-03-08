import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

function BookDetails() {
    const [book, setBook] = useState(null);
    const { bookId } = useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
                headers: { 'Content-Type': 'application/json' },
            });


                const data = await response.json();
                setBook(data.book);
                console.log(data.book)
            };

        fetchData();
    }, 
    [bookId]);

    const handleCheckout = () => {
        navigate(`/checkout/${bookId}`); // Navigate to Checkout
    };

    if (!book) {
        return <div>Loading...</div>;
    }
    const goToAccount = () => {
        navigate('/account'); 
    };
    const goHome = () => {
        navigate('/'); 
    };
    return (
        <div>
        <button onClick={goHome}>Home</button> 
        <button onClick={goToAccount}>Account</button> 
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Title: {book.title}</p>
            <p>Desciption: {book.description}</p>
            <p>Book Available: {book.available}</p>
            <button onClick={handleCheckout}>Checkout</button>
            {book.coverimage && <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ maxWidth: '200px', maxHeight: '300px' }} />}
        </div>
    );
}

export default BookDetails;
