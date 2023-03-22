import "./InventoryListItem.scss";

import editIcon from "../../assets/images/icons/edit-24px.svg";
import deleteIcon from "../../assets/images/icons/delete_outline-24px.svg";
import arrowRight from "../../assets/images/icons/chevron_right-24px.svg";

import { useNavigate, NavLink  } from 'react-router-dom';
import Modal from "react-modal";
import  {useState} from 'react';
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal"



const InventoryListItem = ({id, warehouse, item, category, status, quantity, inventory, setInventoryToDisplay}) => {
    const navigateEditPage = useNavigate();

    const handleEditClick = () => {
        navigateEditPage(`/inventory/edit/${id}`)
    };

    let statusContainerClass = ""
        if(status === "Out of Stock") {
            statusContainerClass = "inventory-info__status-containter--red"
        } else {statusContainerClass = "inventory-info__status-containter"}
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
      <div className="inventory-info">
        <div className="inventory-info__mobile-flex-first">
            <p className="inventory-info__heading">INVENTORY ITEM</p>
            <NavLink className="inventory-info__item-container" to={`/inventory/${id}`} ><div className="inventory-info__item-container">
                <p className="inventory-info__item--bold">{item}</p>
                <img className="inventory-info__arrow" src={arrowRight} alt="Arrow Right"></img>
            </div></NavLink>
            <p className="inventory-info__heading">CATEGORY</p>
            <p className="inventory-info__item">{`${category}`}</p>
        </div>

        <div className="inventory-info__mobile-flex-second">
            <p className="inventory-info__heading">STATUS</p>
            <div className={statusContainerClass}>
                <p className="inventory-info__item-status">{status}</p>
            </div>
            <p className="inventory-info__heading">QTY</p>
            <p className="inventory-info__item-quantity">{quantity}</p>
            <p className="inventory-info__heading">WAREHOUSE</p>
            <p className="inventory-info__item">{warehouse}</p>
        </div>

        <div className="inventory-info__delete-edit">
            <img onClick={openModal} className="inventory-info__delete" src={deleteIcon} alt="Delete Icon"/>
            <img className="inventory-info__edit" onClick={handleEditClick} src={editIcon} alt="Edit Icon"/>
        </div>

        <DeleteInventoryModal
        isOpen={isOpen}
        closeModal={closeModal}
        id={id}
        item = {item}
        inventory={inventory}
        setInventoryToDisplay={setInventoryToDisplay}
        />
      </div>
  );
};

export default InventoryListItem;