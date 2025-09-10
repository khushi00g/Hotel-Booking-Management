import { onValue, ref, remove } from "firebase/database";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { db } from "../../config/firebase-config";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";
import styled from "styled-components";

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Accepted" ? "green" : "")};
  color: ${(props) => (props.type === "Rejected" ? "red" : "")};
`;

const MyBookings = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [selectedBooking, setSelectedBooking] = useState(null); // State to hold selected booking details
  const [bookings, setBookings] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    const bookingsRef = ref(db, "/bookings/");
    console.log("Fetching bookings from Firebase...");
    console.log("User email:", user.email); // Log user email
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      setLoading(false); // Set loading to false after data is fetched
      const snapshotData = snapshot.val();
      console.log("Snapshot data:", snapshotData);
      const data = snapshotData;
      if (data !== null) {
        const filteredBookings = Object.values(data).filter(booking => {
          console.log("Checking booking:", booking);
          console.log("Booking status:", booking.status);
          return booking.refID === user.email;
        });
        setBookings(filteredBookings);
      }
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [user.email]);

  useEffect(() => {
    const bookingsRef = ref(db, "/bookings/");
    console.log("Fetching bookings from Firebase...");
    console.log("User email:", user.email); // Log user email
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      setLoading(false); // Set loading to false after data is fetched
      console.log("Snapshot data:", snapshot.val());
      const data = snapshot.val();
      if (data !== null) {
        const filteredBookings = Object.values(data).filter(booking => {
          console.log("Checking booking:", booking);
          console.log("Booking status:", booking.status);
          return booking.refID === user.email;
        });
        setBookings(filteredBookings);
      }
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [user.email]);

  const deleteBooking = (dlt) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      remove(ref(db, `/bookings/${dlt.cnic}`));
    }
  };
  
  return (
    <>
    <div className="container my-5"></div>
      {/* {loading ? ( // Show loading state */}
      <center>
        <div><h3> Bookings</h3></div>
        </center>
      {/* // ) : bookings.length > 0 ? ( */}
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "90%", margin: "80px auto" }}
          responsive
        >
          <thead>
            <tr>
              <th>Email</th>
              <th>Room type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Capacity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((booking) => (
                <tr key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <td>{booking.email}</td>
                <td>{booking.type}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.capacity + "persons"}</td>
                <td>{booking.totalPrice}</td>
                <StatusTD type={booking.status}>{booking.status}</StatusTD>
                <td style={{ textAlign: "center" }}>
                  <AiOutlineDelete
                    color="red"
                    style={{ cursor: "pointer", fontSize: "20px", }}
                    onClick={() => deleteBooking(booking)}
                  />
                </td>
              </tr>
            )) : (<tr>
                    {/* <td colSpan="6">No bookings available.</td> */}
                   </tr>)}
            {/* // ))} */}
          </tbody>
        </Table>
      {/* ) : ( */}
        <div className="container roomerror">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg p-4 error">
                {/* <h1 className="text-center display-4">No bookings found.</h1> */}
                <h3 className="text-center p-3">Click below to start Booking!.</h3>
                <Link to="/rooms" className="btn btn-warning mt-4 start-booking-btn">
                  Start Booking.
                </Link>
              </div>
            </div>
          </div>
        </div>
      
      {/* {selectedBooking && ( // Modal or section to display booking details
        <div className="booking-details-modal">
          <h2>Booking Details</h2>
          <p>Room Type: {selectedBooking.type}</p>
      
          <p>Start Date: {selectedBooking.startDate}</p>
          <p>End Date: {selectedBooking.endDate}</p>
          <p>Capacity: {selectedBooking.capacity}</p>
        </div>
      )} */}
    </>
  );
};

export default MyBookings;
