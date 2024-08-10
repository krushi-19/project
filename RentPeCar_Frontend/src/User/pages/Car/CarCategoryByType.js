import { url } from "../../../Commons/constants";
import { useLocation, useHistory } from "react-router";
import CarCard from "../../Components/CarCard";
import { useState } from "react";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";

const CarCategoryByType = () => {
  const location = useLocation();
  const cars = location.state.carCategory;
  const [carCategory, setCarCategory] = useState([]);
  const history = useHistory();
  console.log(cars);

  const getCarCategoryDetails = (car) => {
    axios.get(url + "/carCategory/" + car.id).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setCarCategory(result);
        console.log(result);
        history.push("/cars-category-details", {
          carCategory: result.data,
        });
      } else {
        alert("Error occurred while getting car categories");
      }
    });
  };

  return (
    <div className="flex-container">
      <Header />
      <div className="content">
        <CarCard onItemSelect={getCarCategoryDetails} cars={cars} />
      </div>
      <Footer />
    </div>
  );
};

export default CarCategoryByType;
