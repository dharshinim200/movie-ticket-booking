// Sample movie data
const movies = [
    { id: 1, title: "The Avengers", availableSeats: 10 },
    { id: 2, title: "Inception", availableSeats: 8 },
    { id: 3, title: "Interstellar", availableSeats: 5 },
    { id: 4, title: "The Dark Knight", availableSeats: 7 }
];

// Array to store bookings
let bookings = [];

// Function to display available movies
function displayMovies() {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear previous list

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Available Seats: ${movie.availableSeats}</p>
            <button onclick="bookMovie(${movie.id})">Book Now</button>
        `;
        movieList.appendChild(movieDiv);
    });
}

// Show the booking form and populate the selected movie
function bookMovie(movieId) {
    const selectedMovie = movies.find(movie => movie.id === movieId);
    document.getElementById('selectedMovie').value = movieId;
    document.getElementById('booking-section').style.display = 'block';
}

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const movieId = parseInt(document.getElementById('selectedMovie').value);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const seats = parseInt(document.getElementById('seats').value);
    
    const selectedMovie = movies.find(movie => movie.id === movieId);
    
    if (seats > selectedMovie.availableSeats) {
        alert("Not enough seats available!");
        return;
    }

    // Reduce the available seats
    selectedMovie.availableSeats -= seats;

    // Store the booking details
    bookings.push({
        movie: selectedMovie.title,
        name: name,
        email: email,
        seats: seats
    });

    alert("Booking successful!");

    // Clear the form
    document.getElementById('bookingForm').reset();
    document.getElementById('booking-section').style.display = 'none';

    // Update the movie list and booking list
    displayMovies();
    displayBookings();
});

// Function to display the bookings
function displayBookings() {
    const bookingList = document.getElementById('booking-list');
    bookingList.innerHTML = ''; // Clear previous bookings

    bookings.forEach(booking => {
        const bookingDiv = document.createElement('div');
        bookingDiv.classList.add('booking');
        bookingDiv.innerHTML = `
            <h4>${booking.movie}</h4>
            <p>Booked by: ${booking.name}</p>
            <p>Email: ${booking.email}</p>
            <p>Seats: ${booking.seats}</p>
        `;
        bookingList.appendChild(bookingDiv);
    });
}

// Initialize the page with available movies
document.addEventListener('DOMContentLoaded', function () {
    displayMovies();
    displayBookings();
});
