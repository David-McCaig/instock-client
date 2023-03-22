import "./WarehousePage.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";

import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const WarehousePage = () => {
  const urlForWarehouseList = "http://localhost:8000/warehouses";

  const [warehouseToDisplay, setwarehouseToDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(urlForWarehouseList)
      .then((response) => {
        setwarehouseToDisplay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateNewWarehousePage = useNavigate();

  const handleNewClick = () => {
    navigateNewWarehousePage("/warehouse/add");
  };

  return (
    <div className="warehouse">
      <div className="warehouse__everything-container">
        <div className="warehouse__container">
          <h2 className="warehouse__heading">Warehouses</h2>
          <div className="warehouse__search-add-container">
            <input
              className="warehouse__search-box"
              type="text"
              placeholder="Search..."
            ></input>
            <button onClick={handleNewClick} className="warehouse__button">
              + Add New Warehouse
            </button>
          </div>
        </div>

        <div className="warehouse__columns">
          <p className="warehouse__title-warehouse">WAREHOUSE</p>
          <p className="warehouse__address">ADDRESS</p>
          <p className="warehouse__contact-name">CONTACT NAME</p>
          <p className="warehouse__contact-info">CONTACT INFORMATION</p>
          <p className="warehouse__actions">ACTIONS</p>
        </div>
      </div>
      <WarehouseList
        warehouses={warehouseToDisplay}
        setwarehouseToDisplay={setwarehouseToDisplay}
      />
    </div>
  );
};

export default WarehousePage;
