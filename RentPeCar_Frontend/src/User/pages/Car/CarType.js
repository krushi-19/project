import { url } from "../../../Commons/constants";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Footer from "../../Components/Footer";
import axios from "axios";
import React from "react";
import CarTypeCard from "../../Components/CarTypeCard";
import { Header } from "../../Components/Header";


export default function CarType() {
    const [carsType, setCarType] = useState([]);
    const [carCategory, setCarCategory] = useState([]);
    const history = useHistory();

    useEffect(() => {
        console.log(`Cars Type component got loaded`);
        getAllCarTypes();
    }, []);

    const getCarCategoryOfSelectedTypes = (carType) => {
        axios.get(url + "/carCategory/type/" + carType.id).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                setCarCategory(result);
                console.log(result);
                history.push("/cars-category-list", {
                    carCategory: result.data,
                });
            } else {
                alert("Error occurred while getting all car categories");
            }
        });
    };

    const getAllCarTypes = () => {
        axios.get(url + "/carType").then((response) => {
            const result = response.data;
            if (result.status === "success") {
                setCarType(result.data);
                console.log(result.data);
            } else {
                alert("Error while loading data");
            }
        });
    };

    return (
        <div className="flex-container">
            <Header />
            <div className="content">
                <h1 className="title-header">Car Types</h1>
                <CarTypeCard
                    onItemSelect={getCarCategoryOfSelectedTypes}
                    carsType={carsType}
                />
            </div>
            <Footer />
        </div>
    );
}
