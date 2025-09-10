// import React from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import { Link } from 'react-router-dom';

// import card1 from '../../imgs/card1.jpg';
// import card2 from '../../imgs/card2.jpg';
// import card3 from '../../imgs/card3.jpg';
// import card4 from '../../imgs/card4.jpg';
// import card5 from '../../imgs/card5.jpg';
// import card6 from '../../imgs/card6.jpg';
// import card7 from '../../imgs/card7.jpg';
// import card8 from '../../imgs/card8.jpg';
// import card9 from '../../imgs/card9.jpg';
// import card10 from '../../imgs/card10.jpg';
// import card11 from '../../imgs/card11.jpg';
// import card12 from '../../imgs/card12.jpg';
// import card13 from '../../imgs/card13.jpg';
// import card14 from '../../imgs/card14.jpg';
// import card15 from '../../imgs/card15.jpg';
// import './Rooms.css';

// const rooms = [
//     { value: 'all', label: 'all' },
//     { value: 'single', label: 'single' },
//     { value: 'double', label: 'double' },
//     { value: 'family', label: 'family' },
//     { value: 'presidential', label: 'presidential' }
// ];

// const price = [
//     { value: 'any', label: 'any' },
//     { value: '1000-1500', label: '1000-1500' },
//     { value: '2000-2500', label: '2000-2500' },
//     { value: '3000-3500', label: '3000-3500' },
//     { value: '4000-4500', label: '4000-4500' }
// ];

// const SearchRooms = () => {
//     const [roomType, setRoomType] = React.useState('all');
//     const [roomPrice, setRoomPrice] = React.useState('any');
//     const [typeofRoom, setTypeofRoom] = React.useState("");

//     const handleRoomChange = (event) => {
//         setRoomType(event.target.value);
//     };

//     const handlePriceChange = (event) => {
//         setRoomPrice(event.target.value);
//     };

//     return (
//         <div>
//             <div className="container">
//                 <center>
//                     <h1 className='featured-heading'> Search Rooms </h1>
//                 </center>
//                 <center>
//                     <div className="dropdown">
//                         <TextField
//                             className="search-room-input"
//                             id="outlined-select-currency"
//                             select
//                             label="Room Type"
//                             value={roomType}
//                             onChange={handleRoomChange}
//                         >
//                             {rooms && rooms.length > 0 ? rooms.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             )) : <MenuItem value="">No rooms available</MenuItem>}
//                         </TextField>
//                         <TextField
//                             className="search-room-input"
//                             id="outlined-select-currency"
//                             select
//                             label="Room Price"
//                             value={roomPrice}
//                             onChange={handlePriceChange}
//                         >
//                             {price.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </div>
//                 </center>

//                 <div className='myCards'>
//                     {(() => {
//                         if (roomType === "all" && (roomPrice === "any" || roomPrice === "1000-1500" || roomPrice === "2000-2500" || roomPrice === "3000-3500" || roomPrice === "4000-4500")) {
//                             return (
//                                 <>
//                                     <div className="card" onMouseEnter={() => setTypeofRoom("single")}>
//                                         <div className="slide slide1">
//                                             <div className="content">
//                                                 <div className="icon">
//                                                     <img src={card1} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="slide slide2">
//                                             <div className="content">
//                                                 <h3>Single Room</h3>
//                                                 <Link to={`/singleRoom/${typeofRoom}`}>
//                                                     <p>Click to book your room of your own choice </p>
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {/* Additional room cards can be added here */}
//                                 </>
//                             );
//                         } else if (roomType === "single" && (roomPrice === "1000-1500" || roomPrice === "any")) {
//                             return (
//                                 <div className="card">
//                                     <div className="slide slide1">
//                                         <div className="content">
//                                             <div className="icon">
//                                                 <img src={card1} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="slide slide2">
//                                         <div className="content">
//                                             <h3>Single Room</h3>
//                                             <Link to={`/singleRoom/${roomType}`}>
//                                                 <p>Click to book your room of your own choice </p>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         }
//                         // Additional conditions for other room types can be added here
//                     })()}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SearchRooms;


import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

import card1 from '../../imgs/card1.jpg';
import card2 from '../../imgs/card2.jpg';
import card3 from '../../imgs/card3.jpg';
import card4 from '../../imgs/card4.jpg';
import card5 from '../../imgs/card5.jpg';
import card6 from '../../imgs/card6.jpg';
import card7 from '../../imgs/card7.jpg';
import card8 from '../../imgs/card8.jpg';
import card9 from '../../imgs/card9.jpg';
import card10 from '../../imgs/card10.jpg';
import card11 from '../../imgs/card11.jpg';
import card12 from '../../imgs/card12.jpg';
import card13 from '../../imgs/card13.jpg';
import card14 from '../../imgs/card14.jpg';
import card15 from '../../imgs/card15.jpg';
import './Rooms.css';

// Dropdown options
const rooms = [
  { value: 'all', label: 'All' },
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'family', label: 'Family' },
  { value: 'presidential', label: 'Presidential' }
];

const price = [
  { value: 'any', label: 'Any' },
  { value: '1000-1500', label: '1000-1500' },
  { value: '2000-2500', label: '2000-2500' },
  { value: '3000-3500', label: '3000-3500' },
  { value: '4000-4500', label: '4000-4500' }
];

// All available rooms (you can add more here)
const allRooms = [
  { id: 1, type: 'single', price: 1200, name: 'Single Room', img: card1 },
  { id: 2, type: 'double', price: 2200, name: 'Double Room', img: card2 },
  { id: 3, type: 'family', price: 3200, name: 'Family Room', img: card3 },
  { id: 4, type: 'presidential', price: 4200, name: 'Presidential Suite', img: card4 },
  { id: 5, type: 'single', price: 1500, name: 'Single Deluxe', img: card5 },
  { id: 6, type: 'double', price: 2500, name: 'Double Deluxe', img: card6 },
  { id: 7, type: 'family', price: 3500, name: 'Family Deluxe', img: card7 },
  { id: 8, type: 'presidential', price: 4400, name: 'Presidential Luxury', img: card8 },
];

// Helper to check if room price matches selected filter
const isPriceMatch = (roomPrice, selected) => {
  if (selected === 'any') return true;
  const [min, max] = selected.split('-').map(Number);
  return roomPrice >= min && roomPrice <= max;
};

const SearchRooms = () => {
  const [roomType, setRoomType] = React.useState('all');
  const [roomPrice, setRoomPrice] = React.useState('any');

  // Filter rooms by type & price
  const filteredRooms = allRooms.filter((room) => {
    const typeMatch = roomType === 'all' || room.type === roomType;
    const priceMatch = isPriceMatch(room.price, roomPrice);
    return typeMatch && priceMatch;
  });

  return (
    <div className="container">
      <center>
        <h1 className="featured-heading">Search Rooms</h1>
      </center>

      <center>
        <div className="dropdown">
          <TextField
            className="search-room-input"
            select
            label="Room Type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            {rooms.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="search-room-input"
            select
            label="Room Price"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
          >
            {price.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </center>

      {/* Cards Section */}
      <div className="myCards">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div className="card" key={room.id}>
              <div className="slide slide1">
                <div className="content">
                  <div className="icon">
                    <img src={room.img} alt={room.name} />
                  </div>
                </div>
              </div>
              <div className="slide slide2">
                <div className="content">
                  <h3>{room.name}</h3>
                  <p>Price: ₹{room.price}</p>
                  <Link to={`/room/${room.type}`}>
                    <p>Click to book your room</p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default SearchRooms;
