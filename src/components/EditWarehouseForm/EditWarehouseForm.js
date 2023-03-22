import "./EditWarehouseForm.scss";

import arrowBack from "../../assets/images/icons/arrow_back-24px.svg";

import axios from "axios";

import { useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const EditWarehouseForm = ({ warehouse, setWarehouse }) => {
    console.log(warehouse)
    const [updatedMessage, setUpdatedMessage] = useState("");

    const [warehouseName, setWarehouseName] = useState(warehouse.warehouse_name);
    const [address, setAddress] = useState(warehouse.address);
    const [city, setCity] = useState(warehouse.city);
    const [country, setCountry] = useState(warehouse.country);
    const [contactName, setContactName] = useState(warehouse.contact_name);
    const [contactPosition, setContactPosition] = useState(warehouse.contact_position);
    const [contactPhone, setContactPhone] = useState(warehouse.contact_phone);
    const [contactEmail, setContactEmail] = useState(warehouse.contact_email);

    const { id } = useParams();

    const handleAddWarehouse = (event) => {
        event.preventDefault();

        axios
            .put(`http://localhost:8000/warehouses/${id}`, {
                'warehouse_name': warehouseName,
                'address': address,
                'city': city,
                'country': country,
                'contact_name': contactName,
                'contact_position': contactPosition,
                'contact_phone': contactPhone,
                'contact_email': contactEmail
            })
            .then((res) => {
                console.log(res);
            })
            .then(setUpdatedMessage("Warehouse has been updated"))
            .catch((error) => {
                console.log(error);
            });
    };

    const navigateWarehousePage = useNavigate();
    const handleCancelClick = (event) => {
        event.preventDefault();
        navigateWarehousePage("/")
    };


    return (
        <form className="section" onSubmit={handleAddWarehouse}>
            <div className="header-container">
                <NavLink className="link" to={`/`}><div className="title-container">
                    <img className="title-container__arrow" src={arrowBack} alt="Arrow back"></img>
                    <h1 className="title-container__title">Edit Warehouse</h1>
                </div></NavLink>
            </div>
            <div className="edit-warehouse-contact-details">

                <div className="edit-details-container">
                    <h2 className="edit-details-container__header">Warehouse Details</h2>
                    <h3 className="edit-details-container__subheader">Warehouse Name</h3>
                    <input className="edit-details-container__input" type="text" value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)} placeholder={warehouse?.warehouse_name}></input>
                    <h3 className="edit-details-container__subheader">Street Address</h3>
                    <input className="edit-details-container__input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={warehouse?.address}></input>
                    <h3 className="edit-details-container__subheader">City</h3>
                    <input className="edit-details-container__input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={warehouse?.city}></input>
                    <h3 className="edit-details-container__subheader">Country</h3>
                    <input className="edit-details-container__input" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder={warehouse?.country}></input>
                </div>
                <div className="edit-details-container--borderless">
                    <h2 className="edit-details-container__header">Contact Details</h2>
                    <h3 className="edit-details-container__subheader">Contact Name</h3>
                    <input className="edit-details-container__input" type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder={warehouse?.contact_name}></input>
                    <h3 className="edit-details-container__subheader">Position</h3>
                    <input className="edit-details-container__input" type="text" value={contactPosition} onChange={(e) => setContactPosition(e.target.value)} placeholder={warehouse?.contact_position}></input>
                    <h3 className="edit-details-container__subheader">Phone Number</h3>
                    <input className="edit-details-container__input" type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder={warehouse?.contact_phone}></input>
                    <h3 className="edit-details-container__subheader">Email</h3>
                    <input className="edit-details-container__input" type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder={warehouse?.contact_email}></input>
                </div>
            </div>
            <div className="edit-buttons-container">
                <button onClick={handleCancelClick} className="edit-buttons-container__cancel">Cancel</button>
                <button type='submit' className="edit-buttons-container__save">Save</button>
                <p className="edit-details-edit-form__message">{updatedMessage}</p>
            </div>
        </form>
    );
};

export default EditWarehouseForm;