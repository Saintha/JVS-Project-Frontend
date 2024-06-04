import React, { useState } from "react";
import "../../styles/admin.css";
import "../../styles/component.css";
import InputField from "../InputField";
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
} from "../../data/datas";
import CommonButton from "../CommonButton";
import { Button } from "react-bootstrap";
import { addVehicle } from "../../redux/action/vehicle";
import { toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import {useDispatch } from "react-redux";
import { setLoading } from "../../redux/reducer/loaderSlice";
import { uploadImage } from "@/src/redux/action/imageUpload";



const AddVehicle = (props) => {
  const fileTypes = ["JPG", "PNG", "GIF","JPEG"];
  const [mainImageFile, setMainImageFile] = useState(null);
  const [outsideViewFiles, setOutsideViewFiles] = useState([]);
  const [insideViewFiles, setInsideViewFiles] = useState([]);

  const dispatch = useDispatch();

  const handleFileChange = (files, category) => {
    if (category === "main") {
      setMainImageFile(files);
    }else if (category === "outside") {
      setOutsideViewFiles((prevFiles) => [...prevFiles, ...files]); 
    } else if (category === "inside") {
      setInsideViewFiles((prevFiles) => [...prevFiles, ...files]); 
    }
  };

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
    dispatch(setLoading(true));
    const imageUrls = [];

    if (mainImageFile) {
      const uploadedImageUrl = await dispatch(uploadImage(mainImageFile));
      if (uploadedImageUrl) {
        imageUrls.push(uploadedImageUrl);
      }
    }
    if (outsideViewFiles.length > 0) {
      for (const file of outsideViewFiles) {
        const uploadedImageUrl = await dispatch(uploadImage(file));
        if (uploadedImageUrl) {
          imageUrls.push(uploadedImageUrl);
        }
      }
    }
    if (insideViewFiles.length > 0) {
      for (const file of insideViewFiles) {
        const uploadedImageUrl = await dispatch(uploadImage(file));
        if (uploadedImageUrl) {
          imageUrls.push(uploadedImageUrl);
        }
      }
    }
   

    const updatedVehicleData = {
      ...vehicleData,
      image: imageUrls,
    };

    addVehicle(updatedVehicleData, (res) => {
      dispatch(setLoading(false));
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
      <h1 className="row ps-2 pb-3">Add Vehicles</h1>
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
            type={"number"}
          />
        </div>
      </div>
      <hr />
      <div className="row pb-2">
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
                label={"Fuel Capacity (L)"}
                placeholder={"In L"}
                type={"number"}
                onChange={(value) => handleChange("fuelcap", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"Power (CC)"}
                placeholder={"In CC"}
                type={"number"}
                onChange={(value) => handleChange("power", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"Mileage (Km)"}
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
                placeholder="Enter No Of Doors"
                type={"number"}
                onChange={(value) => handleChange("noofdoors", value)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pb-2">
              <InputField
                label={"No Of Seats"}
                placeholder="Enter No Of Seats"
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
        <label htmlFor="input-field" className="Text-input-label pb-2">
          Upload Images
        </label>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <FileUploader
           handleChange={(file) => handleFileChange(file, "main")}
            name="file"
            types={fileTypes}
            label={"Upload Main Image"}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <FileUploader
            handleChange={(files) => handleFileChange(files, "outside")}
            name="file"
            types={fileTypes}
            label={"Upload OutSide View Images"}
            multiple
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 pb-2">
          <FileUploader
            handleChange={(files) => handleFileChange(files, "inside")}
            name="file"
            types={fileTypes}
            label={"Upload InSide View Images"}
            multiple
          />
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
