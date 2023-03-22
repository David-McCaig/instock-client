import React from "react";
import closeIcon from "../../assets/images/icons/close-24px.svg";

import Modal from "react-modal";
import axios from "axios";

import "../DeleteInventoryModal/DeleteInventoryModal.scss";

const DeleteInventoryModal = ({
  id,
  item,
  setInventoryToDisplay,
  inventory,
  isOpen,
  closeModal,
}) => {
  const urlForInventoryDelete = `http://localhost:8000/inventories/${id}`;

  //Delete inventory
  const deleteInventory = () => {
    //Delete inventory
    axios
      .delete(urlForInventoryDelete)
      .then(() => {
        //Filter deleted inventory from inventory list
        setInventoryToDisplay(
          inventory.filter((inventoryItem) => {
            return inventoryItem.id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete Modal"
      className="delete-warehouse"
      overlayClassName="delete-warehouse__overlay"
    >
      <div className="delete-warehouse__top-container">
        <img
          src={closeIcon}
          alt="Delete Icon"
          className="delete-warehouse__close"
          onClick={closeModal}
        />
        <h1 className="delete-warehouse__heading">{`Delete ${item} inventory item?`}</h1>
        <p className="delete-warehouse__confirm-text">{`Please confirm that you’d like to delete ${item} from the inventory list. You won’t be able to undo this action.`}</p>
      </div>
      <div className="delete-warehouse__cancel-delete">
        <div
          className="delete-warehouse__button delete-warehouse__button--cancel"
          onClick={closeModal}
          onBlur={closeModal}
        >
          Cancel
        </div>
        <div
          className="delete-warehouse__button delete-warehouse__button--delete"
          onClick={deleteInventory}
          onBlur={closeModal}
        >
          Delete
        </div>
      </div>
    </Modal>
  );
};

export default DeleteInventoryModal;