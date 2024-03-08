import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
    // State to hold the reservations data
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No access token found");
                return;
            }
            try {
                setIsLoading(true); // Set loading state to true while fetching data
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok'); 
                }
                const data = await response.json();
                setReservations(data); 
                setIsLoading(false); 
            } catch (error) {
                setError(error.message); 
                setIsLoading(false);
            }
        };

        fetchReservations();
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
     <div>
         <h2>My Reservations</h2>
         <button onClick={goToHome}>Home</button>  {/* Button to navigate to Home */}
         <button onClick={goToBooks}>Books</button>  {/* Button to navigate to Books page */}
         {reservations.length > 0 ? (
             <ul>
                 {reservations.map((reservation, index) => (
                     <li key={index}>
                         {/* Reservation details */}
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