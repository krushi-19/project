import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { url } from "../../../Commons/constants";
import BookingRow from "../../Components/BookingRow";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";

function MyBookings() {
  let user = JSON.parse(sessionStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = () => {
    axios
      .get(`${url}/booking/findByUser/${user.data.userid}`)
      .then((response) => {
        const result = response.data;
        if (result.status === "success") {
          setBookings(result.data);
          console.log(result);
        } else {
          alert("Error occurred while getting bookings");
          console.error(result.error);
        }
      });
  };

  const bookingDetail = (booking) => {
    if (!booking.status) {
      alert("Booking is not confirmed yet...!");
    } else {
      axios.get(`${url}/booking/${booking.bookingid}`).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          console.log(result);
          history.push("/booking_details", {
            bookingDetails: result.data,
          });
        } else {
          alert("Error occurred while getting booking details");
        }
      });
    }
  };

  const cancelBooking = (booking) => {
    if (booking.status) {
      alert("Booking is confirmed");
    } else {
      axios.delete(`${url}/booking/${booking.bookingid}`).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          console.log(result.status);
          alert("Booking cancelled");
          getBookings(); // Refresh bookings instead of reloading the page
        } else {
          alert("Error occurred while canceling booking");
          console.error(result.error);
        }
      });
    }
  };

  return (
    <div className="flex-container">
      <Header />
      <div className="content">
        <h1 className="title-header">My Bookings</h1>
        <hr />
        <div className="nav-container">
          <table className="table table-sm">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Car Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Booking Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <BookingRow
                  key={booking.bookingid} // Add unique key for each row
                  booking={booking}
                  deleteBooking={cancelBooking}
                  bookingDetail={bookingDetail}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyBookings;
