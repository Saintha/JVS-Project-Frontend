import React, { useState } from "react";
import "../styles/admin.css";
import "../styles/component.css";
import InputField from "./InputField";
import {
  Brand,
  Districts,
  Features,
  FuelType,
  GearCount,
  OwnershipOptions,
  VehicleColors,
  VehicleTransmission,
  Vehicletype,
} from "../data/datas";
import CommonButton from "./CommonButton";
import { Button } from "react-bootstrap";
import { addVehicle } from "../redux/action/vehicle";
import { toast } from "react-toastify";


const AddVehicle = (props) => {
  const generateYears = () => {
    const years = [];
    for (let year = 1950; year <= 2023; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateYears();

  const [vehicleData, setVehicleData] = useState({
    name: "",
    registerno: "",
    type: "",
    brand: "",
    model: "",
    price: "",
    ownership: "",
    transmission: "",
    gear: "",
    color: "",
    yom: "",
    fuel: "",
    fuelcap: "",
    power: "",
    mileage: "",
    noofdoors: "",
    noofseats: "",
    district: "",
    description: "",
    features: "",
    documents: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vehicleData, "vehicleeeeeeeee");
    addVehicle(vehicleData, (res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleChange = (field, value) => {
    setVehicleData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFeatureChange = (feature) => {
    setVehicleData((prevData) => {
      const features = prevData.features.includes(feature)
        ? prevData.features.filter((f) => f !== feature)
        : [...prevData.features, feature];
      return { ...prevData, features };
    });
  };

  return (
    <div className="container-fluid Add-Vehicle-Section">
      <h1 className="row ps-2 mb-3">Add Vehicles</h1>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <InputField
            label={"Vehicle Register No"}
            placeholder={"Enter the Regsiter No"}
            onChange={(value) => handleChange("registerno", value)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <InputField
            label={"Name"}
            placeholder={"Enter the Vehicle Name"}
            onChange={(value) => handleChange("name", value)}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              OwnerShip
            </label>
            <div className="d-flex gap-3">
              {OwnershipOptions.map((option, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="ownership"
                    id={`ownership-${option}`}
                    value={option}
                    onChange={(e) => handleChange("ownership", e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`ownership-${option}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <InputField
            label="Vehicle Type"
            placeholder="Select the Type"
            onChange={(value) => handleChange("type", value)}
            select
            options={Vehicletype}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <InputField
            label="Brand"
            placeholder="Select the Brand"
            onChange={(value) => handleChange("brand", value)}
            select
            options={Brand}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <InputField
            label={"Model"}
            placeholder={"Enter the Modal"}
            onChange={(value) => handleChange("model", value)}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <InputField
            label={"Price"}
            placeholder={"Enter the Price"}
            onChange={(value) => handleChange("price", value)}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12 pb-2">
          <InputField
            label="Transmission"
            placeholder="Select the Transmission"
            onChange={(value) => handleChange("transmission", value)}
            select
            options={VehicleTransmission}
          />
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
          <InputField
            label="Gear Box"
            placeholder="Select the Gear Count"
            onChange={(value) => handleChange("gear", value)}
            select
            options={GearCount}
          />
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 pb-2">
          <InputField
            label="Color"
            placeholder="Select the Color"
            onChange={(value) => handleChange("color", value)}
            select
            options={VehicleColors}
          />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 pb-2">
          <InputField
            label="YOM"
            placeholder="Select the Year"
            onChange={(value) => handleChange("yom", value)}
            select
            options={years}
          />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-2">
          <InputField
            label="Fuel"
            placeholder="Select Fuel"
            onChange={(value) => handleChange("fuel", value)}
            select
            options={FuelType}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"Fuel Capacity"}
                placeholder={"In L"}
                type={"number"}
                onChange={(value) => handleChange("fuelcap", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"Power"}
                placeholder={"In CC"}
                type={"number"}
                onChange={(value) => handleChange("power", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"Mileage"}
                placeholder={"In Km"}
                type={"number"}
                onChange={(value) => handleChange("mileage", value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"No Of Doors"}
                placeholder={""}
                type={"number"}
                onChange={(value) => handleChange("noofdoors", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"No Of Seats"}
                placeholder={""}
                type={"number"}
                onChange={(value) => handleChange("noofseats", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label="District"
                placeholder="Select District"
                onChange={(value) => handleChange("district", value)}
                select
                options={Districts}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="form-group">
            <label htmlFor="input-field" className="Text-input-label">
              Description
            </label>
            <textarea
              className="form-control"
              placeholder={"Small description about Vehicle"}
              rows={4}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />
      <h3 className="Text-input-label fw-bold">Features</h3>
      <div className="container-fluid">
        <div className="row">
          {Features.slice(0, 6).map((option, index) => (
            <div className="form-check col-lg-2 col-md-4 col-sm-6" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={`checkbox-${index}`}
                onChange={() => handleFeatureChange(option)}
              />
              <label className="Text-input-label" htmlFor={`checkbox-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="row">
          {Features.slice(6, 12).map((option, index) => (
            <div className="form-check col-lg-2 col-md-4 col-sm-6" key={index}>
             <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={`checkbox-${index}`}
                onChange={() => handleFeatureChange(option)}
              />
              <label className="Text-input-label" htmlFor={`checkbox-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="row">
          {Features.slice(12, 14).map((option, index) => (
            <div className="form-check col-lg-2 col-md-4 col-sm-6">
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={`checkbox-${index}`}
              />
              <label className="Text-input-label" htmlFor={`checkbox-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputField label={"Documents"} type={"file"} />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InputField label={"Images"} type={"file"} />
        </div>
      </div>
      <hr />
      <div className="d-flex gap-2 justify-content-end pe-2 pb-3">
        <CommonButton text={"Add"} width={164} onClick={handleSubmit} />
        <Button
          variant="secondary"
          onClick={props.handleClose}
          style={{ width: 111 }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AddVehicle;
