
import "./WarehouseDetailsList.scss";

import arrowBack from "../../assets/images/icons/arrow_back-24px.svg";

import { useNavigate, NavLink  } from 'react-router-dom';

const WarehouseDetailsList = ({warehouseToDisplay}) => {

    const navigateEditPage = useNavigate();

    const handleEditClick = () => {
        navigateEditPage(`/warehouse/edit/${warehouseToDisplay.id}`)
    };

    const warehouseName = warehouseToDisplay.warehouse_name;
    const warehouseAddress = warehouseToDisplay.address;
    const city = warehouseToDisplay.city;
    const country = warehouseToDisplay.country;
    const warehouseContact = warehouseToDisplay.contact_name;
    const warehouseContactPosition = warehouseToDisplay.contact_position;
    const warehousePhone = warehouseToDisplay.contact_phone;
    const warehouseEmail = warehouseToDisplay.contact_email;

    return (
        <div className="warehouse-details">
            <div className="warehouse-details__top-container">
                <NavLink className="warehouse-details__name-container" to={`/`} ><div className="warehouse-details__name-container">
                    <img className="warehouse-details__arrow" src={arrowBack} alt="Arrow back"></img>
                    <p className="warehouse-details__name">{warehouseName}</p>
                </div></NavLink>
                <div className="warehouse-details__button-container">
                    <button onClick={handleEditClick} className="warehouse-details__edit-icon"><p className="warehouse-details__button-text">Edit</p></button>
                </div>
            </div>
            <div className="warehouse-details__address-contact-container">
                <div className="warehouse-details__address-container">
                    <h2 className="warehouse-details__heading">WAREHOUSE ADDRESS:</h2>
                    <p className="warehouse-details__text">{`${warehouseAddress}, ${city}, ${country}`}</p>
                </div>
                <div className="warehouse-details__all-contact-container">
                    <div className="warehouse-details__contact-name-container">
                        <h2 className="warehouse-details__heading">CONTACT NAME:</h2>
                        <p className="warehouse-details__text">{warehouseContact}</p>
                        <p className="warehouse-details__text">{warehouseContactPosition}</p>
                    </div>
                    <div className="warehouse-details__contact-info-container">
                        <h2 className="warehouse-details__heading">CONTACT INFORMATION:</h2>
                        <p className="warehouse-details__text">{warehousePhone}</p>
                        <p className="warehouse-details__text">{warehouseEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarehouseDetailsList;