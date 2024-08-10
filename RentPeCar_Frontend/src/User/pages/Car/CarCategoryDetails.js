import React from "react";
import { useLocation, useHistory } from "react-router";
import { Header } from "../../Components/Header";
import { url } from "../../../Commons/constants";
import Footer from "../../Components/Footer";



function CarCategoryDetails() {
  const location = useLocation();
  const history = useHistory();
  const cars = location.state.carCategory;

  const BookNow = () => {
    let isActive = sessionStorage.getItem("isActive");
    if (isActive !== null) {
      history.push("/book_car");
    } else {
      history.push("/signin");
    }
  };

  return (
    <div className="flex-container">
      <Header />
      <div className="content">
        <h1 className="title-header">Car Category Details</h1>

        {cars.map((car) => {
          sessionStorage.setItem("carCategory", JSON.stringify(car));
          return (
            <table border="1" align="center" key={car.id}>
              <tbody>
                <tr>
                  <td colSpan="2" className="title-header">
                    <h2>{car.categoryName}</h2>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <img
                      style={{ width: "900px", height: "500px" }}
                      src={url + "/" + car.carCatImg}
                      alt="category"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Car Title :</td>
                  <td>{car.categoryName}</td>
                </tr>
                <tr>
                  <td>Seat/Capacity :</td>
                  <td>{car.seatCapacity} Seats</td>
                </tr>
                <tr>
                  <td>Fuel Type :</td>
                  <td>{car.fuelType}</td>
                </tr>
                <tr>
                  <td>Price Per Day :</td>
                  <td>{car.pricePerDay}/day</td>
                </tr>
                <tr>
                  <td colSpan="2" className="title-header">
                    <button className="btn btn-warning" onClick={BookNow}>
                      <b>Book Now</b>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default CarCategoryDetails;
