import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table"; // Import Table from react-bootstrap
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import hotel1 from '../../imgs/hotel1.jpg';
import './Booknow.css';
import { ref, set, onValue } from "firebase/database";
import { db } from "../../config/firebase-config";

export default function Booknow() {
  const { roomType } = useParams();
  var roomsDetails = {};
  if (roomType === "single") {
    roomsDetails = {
      capacity: 1,
      breakfast: "included",
      price: 1200,
      pets: "allowed",
      roomtype: "single",
      size: "250 sqft"
    };
  } else if (roomType === "double") {
    roomsDetails = {
      capacity: 2,
      breakfast: "included",
      price: 2400,
      pets: "allowed",
      roomtype: "double",
      size: "500 sqft"
    };
  } else if (roomType === "family") {
    roomsDetails = {
      capacity: 6,
      breakfast: "not included",
      price: 3500,
      pets: "not allowed",
      roomtype: "family",
      size: "750 sqft"
    };
  } else if (roomType === "presidential") {
    roomsDetails = {
      capacity: 4,
      breakfast: "included",
      price: 4300,
      pets: "not allowed",
      roomtype: "presidential",
      size: "1000 sqft"
    };
  }

  const [fullName, setFullName] = useState("");
  const [value, setValue] = useState(0);
  const [cnic, setCnic] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookings, setBookings] = useState([]); // State to hold bookings
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookings from Firebase
    const fetchBookings = async () => {
      const bookingsRef = ref(db, 'bookings/');
      onValue(bookingsRef, (snapshot) => {
        const data = snapshot.val();
        const bookingsList = [];
        for (let id in data) {
          bookingsList.push({ id, ...data[id] });
        }
        setBookings(bookingsList);
      });
    };
    fetchBookings();
  }, []);

  function handleName(name) {
    setFullName(name.target.value);
  }
  function handlepersons(val) {
    setPersons(val.target.value);
  }
  function handleemail(val) {
    setEmail(val.target.value);
  }
  function handleaddress(val) {
    setAddress(val.target.value);
    console.log(address)

  }

function handleCnic(val) {
    const cnicValue = val.target.value;
    if (cnicValue.length > 13) {
        alert("CNIC must be exactly 13 digits.");
        return;
    }
    setCnic(cnicValue);
}

  function handleChangeStart(date) {
    setStartDate(date);
  }
  function handleChangeEnd(date) {
    setEndDate(date);
  }
  function calculateDaysLeft(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);
    return endDate.diff(startDate, "days");
  }
  var daysLeft = calculateDaysLeft(startDate, endDate);
  const formattedDate = startDate
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
  const formattedEndDate = endDate
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");

function writeToDatabase() {
    if (!/^\d{13}$/.test(cnic)) {
        return alert("Please enter a valid CNIC number (13 digits).");
    }

    if (persons > roomsDetails.capacity) {
      return alert("The number of persons exceeds the room capacity. Please check the capacity of the room.");
    }

    if (daysLeft <= 0 || endDate <= startDate) {
        alert("Please select valid dates. The end date must be after the start date.");

      // return alert("Please select valid dates. The end date must be after the start date.");
    }

    if (
      fullName &&
      address &&
      cnic &&
      email &&
      value &&
      persons <= roomsDetails.capacity &&
      startDate &&
      endDate
    ) {
        console.log("Writing booking data to Firebase:", { // Log the booking data being sent


        name: fullName,
        address: address,
        cnic: cnic,
        email: email,
        phone: value,
        persons: persons,
        type: roomsDetails.roomtype,
        startDate: formattedDate,
        endDate: formattedEndDate,
        totalPrice: daysLeft * roomsDetails.price,
        days: daysLeft,
        capacity: roomsDetails.capacity,
        status: "Confirmed", // Updated status to "Confirmed"
        refID: email,
      }); // Log the booking data being written

      set(ref(db, `bookings/${cnic}`), { // Write booking data to Firebase
        name: fullName,
        address: address,
        cnic: cnic,
        email: email,
        phone: value,
        persons: persons,
        type: roomsDetails.roomtype,
        startDate: formattedDate,
        endDate: formattedEndDate,
        totalPrice: daysLeft * roomsDetails.price,
        days: daysLeft,
        capacity: roomsDetails.capacity,
        status: "Confirmed", // Updated status to "Confirmed"
        refID: email,
      }) // Write booking data to Firebase
      .then(() => {
        // alert("Booked Successfully! Your booking has been recorded. Booking details have been sent to Firebase.");

        alert("Booking successfully! Your booking details have been sent to Firebase.");

        navigate("/");
      }).catch((error) => {
        console.error("Error writing booking data:", error); // Log the error
        alert("Error booking: " + error.message + ". Please try again.");
      });
      // Reset form fields
      setFullName("");
      setAddress("");
      setCnic(0);
      setEmail("");
      setValue(0);
      setPersons(0);
    } else {
      alert("Please fill all fields.");
    }
  }

  return ( 
    // <div className="container my-5">
    //   <h2>Your Bookings</h2>
    //   <Table striped bordered hover size="sm">
    //     <thead>
    //       <tr>
    //         <th>Room Type</th>
    //         <th>Start Date</th>
    //         <th>End Date</th>
    //         <th>Capacity</th>
    //         <th>Total Price</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {bookings.length > 0 ? bookings.map((booking) => (
    //           <tr key={booking.id}>
    //             <td>{booking.type}</td>
    //             <td>{booking.startDate}</td>
    //             <td>{booking.endDate}</td>
    //             <td>{booking.capacity + " persons"}</td>
    //             <td>Rs {booking.totalPrice}</td>
    //             <td>{booking.status}</td>
    //           </tr>
    //       )) : (
    //         <tr>
    //           <td colSpan="6">No bookings available.</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </Table>
      <div className="container my-5">
        <h1 className="display-4 booking-hd">Booking</h1>
        <div className="row">
          <div className="col-md-6 col-12 my-auto">
            <img
              src={hotel1}
              className="img-fluid"
              alt="selected room"
            />
          </div>
          <div className="col-md-6 col-12 my-auto">
            <h1>Rooms Details</h1>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th className="dark-shade">Room Type</th>
                  <td>{roomsDetails.roomtype}</td>
                </tr>
                <tr>
                  <th className="dark-shade">Capacity</th>
                  <td>{roomsDetails.capacity + " persons"}</td>
                </tr>
                <tr>
                  <th className="dark-shade">Size</th>
                  <td>{roomsDetails.size}</td>
                </tr>
                <tr>
                  <th className="dark-shade">Breakfast</th>
                  <td>{roomsDetails.breakfast}</td>
                </tr>
                <tr>
                  <th className="dark-shade">Pets</th>
                  <td>{roomsDetails.pets}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-6 col-12">
            <div className="form-group">
              <label htmlFor="Fromdate" className="font-weight-bolder mr-3">
                From Date{" "}
              </label>
              <DatePicker       
                selected={startDate}
                onChange={handleChangeStart}
                minDate={moment().toDate()}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="form-group">
              <label htmlFor="Todate" className="font-weight-bolder mr-3">
                To Date{" "}
              </label>
              <DatePicker
                selected={endDate}
                minDate={moment().toDate()}
                onChange={handleChangeEnd}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <h6 className="font-weight-bolder">
              Number of days : {daysLeft}
            </h6>
            <mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
          </div>
          <div className="col-md-6 col-12">
            <h6 className="font-weight-bold">
              Price per day :{" "}
              <span className="">Rs {roomsDetails.price}</span>
            </h6>
            <h6 className="font-weight-bold">
              Total Price to be paid :{" "}
              <span className="text-primary">Rs {roomsDetails.price * daysLeft}</span>
            </h6>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-12 col-12 my-auto">
            <div className="col-md-12 col-12 float-right">
              <form>
                <div className="form-group">
                  <label htmlFor="persons">No. of persons</label>
                  <input
                    type="number"
                    value={persons}
                    className="form-control"
                    onChange={handlepersons}
                    id="persons"
                    placeholder="No. of persons"
                    required
                  />
                  <br />
                  <label htmlFor="forName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    id="forName"
                    onChange={handleName}
                    placeholder="Full name"
                    required
                  />
                  <br />
                  <label htmlFor="Number">Number</label>
                  <PhoneInput
                    defaultCountry="PK"
                    className="phoneInput"
                    id="number"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                  />
                  <br />
                  <label htmlFor="CNIC">CNIC Number</label>
                  <input
                    type="number"
                    className="form-control"
                    value={cnic}
                    onChange={handleCnic}
                    required
                    id="CNIC"
                    placeholder="CNIC"
                    maxLength={13}
                  />
                  <br />
                  <label htmlFor="address">Address</label>
                  <input
                    type="address"
                    className="form-control"
                    value={address}
                    onChange={handleaddress}
                    required
                    id="address"
                    placeholder=" your address"
                    
                  />
                  <br />
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleemail}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Enter the same email through which you have logged in.
                  </small>
                </div>
                <div className="form-group form-check"></div>
              </form>
              <center>
                <button onClick={writeToDatabase}
                  className="btn btn-block btn-outline-primary confirm-booking-btn"
                >
                  Confirm Booking
                </button><br/><br/>
                <Link to="/" className="btn btn-home btna">Return to Home</Link>
              </center>
            </div>
          </div>
        </div>
      </div>
 //   </div>
  );
}
