import React from 'react';
import card1 from '../../imgs/card1.jpg';
import card5 from '../../imgs/card5.jpg';
import card3 from '../../imgs/card3.jpg';
import card2 from '../../imgs/card2.jpg';
import card15 from '../../imgs/card15.jpg';
import card13 from '../../imgs/card13.jpg';
import './MyCards.css';
import { Link } from 'react-router-dom';

const MyCards = ({ rooms = [] }) => { // Added fallback for rooms
    return (
        <div>
            <div className="container">
                <center>
                   <h1 className='featured-heading'> Featured Rooms </h1>
                </center>
                <div className='myCards'>
                    {rooms.length > 0 ? ( // Check if rooms exist before mapping
                        rooms.map((room, index) => ( // Map over rooms data
                            <div className="card" key={index}>
                                <div className="slide slide1">
                                    <div className="content">
                                        <div className="icon">
                                            <img src={card1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="slide slide2">
                                    <div className="content">
                                        <h3>{room.name}</h3> {/* Assuming room has a name property */}
                                        <Link to={`/singleRoom/${room.id}`} className='links'>
                                            <p>Click to book your room of your own choice </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available.</p> // Fallback if no rooms
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyCards;
