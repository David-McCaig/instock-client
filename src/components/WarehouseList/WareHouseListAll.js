import "./WarehouseList.scss";

import editIcon from "../../assets/images/icons/edit-24px.svg";
import deleteIcon from "../../assets/images/icons/delete_outline-24px.svg";
import arrowRight from "../../assets/images/icons/chevron_right-24px.svg";

import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import Modal from "react-modal";
import DeleteWarehouseModal from "../DeleteWarehouseModal/DeleteWarehouseModal";

Modal.setAppElement("#root");

const WareHouseListAll = ({
  id,
  warehouseName,
  warehouseAddress,
  city,
  country,
  warehouseContact,
  warehousePhone,
  warehouseEmail,
  setwarehouseToDisplay,
  warehouses
}) => {
  const navigateEditPage = useNavigate();

  const handleEditClick = () => {
    navigateEditPage(`/warehouse/edit/${id}`);
  };

   //Delete Warehouse Modal Window
   const [isOpen, setIsOpen] = useState(false);
   //Open Modal Event Handler
   const openModal = () => {
     setIsOpen(true);
   };
   //Close Modal Handler
   const closeModal = () => {
     setIsOpen(false);
     navigateEditPage("/");
   };

  return (
    <div className="warehouse-info">
      <div className="warehouse-info__mobile-flex-first">
        <p className="warehouse-info__title-warehouse-heading">WAREHOUSE</p>
        <NavLink
          className="warehouse-info__name-container"
          to={`/warehouse/${id}`}
        >
          <div className="warehouse-info__name-container">
            <p className="warehouse-info__name">{warehouseName}</p>
            <img
              className="warehouse-info__arrow"
              src={arrowRight}
              alt="Arrow Right"
            ></img>
          </div>
        </NavLink>
        <p className="warehouse-info__address-heading">ADDRESS</p>
        <p className="warehouse-info__address">{`${warehouseAddress}, ${city}, ${country}`}</p>
      </div>

      <div className="warehouse-info__mobile-flex-second">
        <p className="warehouse-info__contact-name-heading">CONTACT NAME</p>
        <p className="warehouse-info__contact-name">{warehouseContact}</p>
        <p className="warehouse-info__contact-info-heading">
          CONTACT INFORMATION
        </p>
        <div className="warehouse-info__phone-email-container">
          <p className="warehouse-info__phone">{warehousePhone}</p>
          <p className="warehouse-info__email">{warehouseEmail}</p>
        </div>
      </div>

      <div className="warehouse-info__delete-edit">
        <img onClick={openModal} src={deleteIcon} alt="Delete Icon" />
        <img onClick={handleEditClick} src={editIcon} alt="Edit Icon" />
      </div>

      <DeleteWarehouseModal
        isOpen={isOpen}
        closeModal={closeModal}
        id={id}
        warehouseName={warehouseName}
        setwarehouseToDisplay={setwarehouseToDisplay}
        warehouses={warehouses}
      />
    </div>
  );
};

export default WareHouseListAll;
