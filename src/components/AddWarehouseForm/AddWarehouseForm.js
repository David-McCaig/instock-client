import "./AddWarehouseForm.scss";

import arrowBack from "../../assets/images/icons/arrow_back-24px.svg";

import axios from "axios";

import { useNavigate, NavLink  } from 'react-router-dom';
import { useState } from "react";

const AddWarehouseForm = () => {
    const [updatedMessage, setUpdatedMessage] = useState("");

    const [warehouseName, setWarehouseName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPosition, setContactPosition] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const handleAddWarehouse = (event) => {
        event.preventDefault();

        axios
        .post('http://localhost:8000/warehouses', {
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
        .then(setUpdatedMessage("Thank you for your upload"))
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
                        <h1 className="title-container__title">Add New Warehouse</h1>
                    </div></NavLink>
                </div>
                <div className="warehouse-contact-details">
                    <div className="details-container">
                        <h2 className="details-container__header">Warehouse Details</h2>
                        <h3 className="details-container__subheader">Warehouse Name</h3>
                        <input className="details-container__input" type="text" value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)} placeholder="Warehouse Name"></input>
                        <h3 className="details-container__subheader">Street Address</h3>
                        <input className="details-container__input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address"></input>
                        <h3 className="details-container__subheader">City</h3>
                        <input className="details-container__input" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"></input>
                        <h3 className="details-container__subheader">Country</h3>
                        <input className="details-container__input" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country"></input>
                    </div>
                    <div className="details-container--borderless">
                        <h2 className="details-container__header">Contact Details</h2>
                        <h3 className="details-container__subheader">Contact Name</h3>
                        <input className="details-container__input" type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Contact Name"></input>
                        <h3 className="details-container__subheader">Position</h3>
                        <input className="details-container__input" type="text" value={contactPosition} onChange={(e) => setContactPosition(e.target.value)} placeholder="Position"></input>
                        <h3 className="details-container__subheader">Phone Number</h3>
                        <input className="details-container__input" type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Phone Number"></input>
                        <h3 className="details-container__subheader">Email</h3>
                        <input className="details-container__input" type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email"></input>
                    </div>
                </div>
                <div className="buttons-container">
                    <button onClick={handleCancelClick} className="buttons-container__cancel">Cancel</button>
                    <button type='submit' className="buttons-container__add">+ Add Warehouse</button>
                    <p className="inventory-edit-form__message">{updatedMessage}</p>
                </div>
        </form>
    );
}

export default AddWarehouseForm;