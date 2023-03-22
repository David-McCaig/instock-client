import React from "react";
import "./InventoryDetails.scss"
import arrowBack from "../../assets/images/icons/arrow_back-24px.svg";
import { useNavigate, NavLink } from 'react-router-dom';


const InventoryDetails = ({ inventoryItem, warehouse }) => {

    const navigateEditPage = useNavigate();

    const handleEditClick = () => {
        navigateEditPage(`/inventory/edit/${inventoryItem.id}`)
    };

    let statusContainerClass = ""
    if (inventoryItem?.status === "Out of Stock") {
        statusContainerClass = "inventory-info__status-containter--red"
    } else { statusContainerClass = "inventory-info__status-containter" }

    return (
        <div className="inventory-details">

            <div className="inventory-details__top-container">
                <NavLink className="inventory-details__name-container" to={`/inventory`} ><div className="warehouse-details__name-container">
                    <img className="inventory-details__arrow" src={arrowBack} alt="Arrow back"></img>
                    <p className="inventory-details__name">{inventoryItem?.item_name}</p>
                </div></NavLink>
                <div className="inventory-details__button-container">
                    <button onClick={handleEditClick} className="inventory-details__edit-icon"><p className="inventory-details__button-text">Edit</p></button>
                </div>
            </div>

            <div className="inventory-details__container">
                <div className="inventory-details__description-wrapper">
                    <div className="inventory-details__description-container">
                        <h2 className="inventory-details__heading">item description:</h2>
                        <p className="inventory-details__text">{inventoryItem?.description}</p>
                    </div>
                    <div className="inventory-details__category-container">
                        <h2 className="inventory-details__heading">category:</h2>
                        <p className="inventory-details__text">{inventoryItem?.category}</p>
                    </div>
                </div>

                <div>
                    <div className="inventory-details__container-bottom">
                        <div className="inventory-details__category-status">
                            <h2 className="inventory-details__heading">status:</h2>
                            <div className={statusContainerClass}>
                                <p className="inventory-details__text-status">{inventoryItem?.status}</p>
                            </div>
                        </div>
                        <div className="inventory-details__category-quantity">
                            <h2 className="inventory-details__heading">Quantity:</h2>
                            <p className="inventory-details__text">{inventoryItem?.quantity}</p>
                        </div>
                    </div>
                    <div className="inventory-details__category-warehouse">
                        <h2 className="inventory-details__heading">Warehouse:</h2>
                        <p className="inventory-details__text">{warehouse?.warehouse_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetails;