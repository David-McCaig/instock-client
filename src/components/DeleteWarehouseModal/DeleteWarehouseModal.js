import React from "react";
import closeIcon from "../../assets/images/icons/close-24px.svg";

import Modal from "react-modal";
import axios from "axios";

import "./DeleteWarehouseModal.scss";

const DeleteWarehouseModal = ({
  id,
  warehouseName,
  setwarehouseToDisplay,
  warehouses,
  isOpen,
  closeModal,
}) => {
  const urlForWarehouseDelete = `http://localhost:8000/warehouses/${id}`;

  //Delete warehouse
  const deleteWarehouse = () => {
    //Delete request
    axios
      .delete(urlForWarehouseDelete)
      .then(() => {
        //Filter deleted warehouse from warheouse list
        setwarehouseToDisplay(
          warehouses.filter((warehouse) => {
            return warehouse.id !== id;
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
        <h1 className="delete-warehouse__heading">{`Delete ${warehouseName} Warehouse?`}</h1>
        <p className="delete-warehouse__confirm-text">{`Please confirm that you’d like to delete the ${warehouseName} from the list of warehouses. You won’t be able to undo this action.`}</p>
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
          onClick={deleteWarehouse}
          onBlur={closeModal}
        >
          Delete
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWarehouseModal;
