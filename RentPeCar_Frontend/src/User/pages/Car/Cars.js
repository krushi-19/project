import { url } from "../../../Commons/constants";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../../Components/CarCard";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [carCategory, setCarCategory] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log(`Cars component got loaded`);
    getAllCars();
  }, []);

  const getAllCars = () => {
    axios.get(url + "/carCategory/").then((response) => {
      const result = response.data;
      if (result.status === "success") {
        setCars(result.data);
        console.log(result.data);
      } else {
        alert("Error while loading data");
      }
    });
  };

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
        alert("Error occurred while getting car category details");
      }
    });
  };

  return (
    <div className="flex-container">
      <Header />

      <div className="content">
        <h1 className="title-header">Car Categories</h1>
        <CarCard
          onItemSelect={getCarCategoryDetails}
          cars={cars}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Cars;
