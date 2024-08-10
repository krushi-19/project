import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { Header } from "../../Components/Header";
import { url } from "../../../Commons/constants";
import Footer from "../../Components/Footer";
import axios from "axios";

function BookingDetails() {
  const location = useLocation();
  const history = useHistory();
  const [booking, setBooking] = useState([]);
  const { bookingid } = location.state;

  useEffect(() => {
    axios.get(url + "/bookings/getById/" + bookingid).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setBooking(result.data);
      } else {
        alert("error while loading booking details");
      }
    });
  }, [bookingid]);

  const { id, startdate, enddate, userid, vehicleid, cost } = booking;

  const cancelBooking = () => {
    const cancel = window.confirm("Are you sure you want to cancel the booking?");
    if (cancel) {
      axios.delete(url + "/bookings/delete/" + id).then((response) => {
        const result = response.data;
        if (result.status === "success") {
          alert("Booking cancelled successfully.");
          history.push("/bookinglist");
        } else {
          alert("error while cancelling booking");
        }
      });
    }
  };

  return (
    <div className="flex-container">
      <Header />
      <div className="container content">
        <h1 className="title-header">Booking Details</h1>
        <div className="booking-details">
          <div>
            <strong>Booking ID:</strong> {id}
          </div>
          <div>
            <strong>Start Date:</strong> {startdate}
          </div>
          <div>
            <strong>End Date:</strong> {enddate}
          </div>
          <div>
            <strong>User ID:</strong> {userid}
          </div>
          <div>
            <strong>Vehicle ID:</strong> {vehicleid}
          </div>
          <div>
            <strong>Cost:</strong> {cost}
          </div>
          <button onClick={cancelBooking} className="btn btn-danger">
            Cancel Booking
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookingDetails;
