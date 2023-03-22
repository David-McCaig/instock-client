import "./InventoryPage.scss";
import InventoryList from "../../components/InventoryList/InventoryList";

import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const InventoryPage = () => {
  const urlForInventoryList = "http://localhost:8000/inventories";

  const [inventoryToDisplay, setInventoryToDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(urlForInventoryList)
      .then((response) => {
        setInventoryToDisplay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateNewInventoryItemPage = useNavigate();

  const handleNewClick = () => {
    navigateNewInventoryItemPage("/inventory/add");
  };

  return (
    <div className="inventory">
      <div className="inventory__everything-container">
        <div className="inventory__container">
          <h2 className="inventory__heading">Inventory</h2>
          <div className="inventory__search-add-container">
            <input
              className="inventory__search-box"
              type="text"
              placeholder="Search..."
            ></input>
            <button onClick={handleNewClick} className="inventory__button">
              + Add New Item
            </button>
          </div>
        </div>

        <div className="inventory__columns">
          <p className="inventory__item">INVENTORY ITEM</p>
          <p className="inventory__category">CATEGORY</p>
          <p className="inventory__status">STATUS</p>
          <p className="inventory__quantity">QTY</p>
          <p className="inventory__warehouse">WAREHOUSE</p>
          <p className="inventory__actions">ACTIONS</p>
        </div>
      </div>
      <InventoryList inventory={inventoryToDisplay} 
      setInventoryToDisplay={setInventoryToDisplay}
      />
    </div>
  );
};

export default InventoryPage;
