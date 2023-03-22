import { useState, useEffect } from "react";
import axios from "axios";

import InventoryListItem from "../InventoryList/InventoryListItem";

const WarehouseInventory = ({ id }) => {
  //GET request for warehouse inventory
  const urlWarehouseInventory = `http://localhost:8000/warehouses/${id}/inventories`;

  const [warehouseInventory, setWarehouseInventory] = useState([]);

  useEffect(() => {
    axios
      .get(urlWarehouseInventory)
      .then(({ data }) => {
        //Set warehouse inventory state
        setWarehouseInventory(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inventory = warehouseInventory.map((inventoryItem) => {
    return (
      <InventoryListItem
        key={inventoryItem.id}
        id={inventoryItem.id}
        warehouse={inventoryItem.warehouse_name}
        item={inventoryItem.item_name}
        category={inventoryItem.category}
        status={inventoryItem.status}
        quantity={inventoryItem.quantity}
      />
    );
  });

  return (
    <>
      <div className="inventory__columns">
        <p className="inventory__item">INVENTORY ITEM</p>
        <p className="inventory__category">CATEGORY</p>
        <p className="inventory__status">STATUS</p>
        <p className="inventory__quantity">QTY</p>
        <p className="inventory__actions">ACTIONS</p>
      </div>
      {inventory}
    </>
  );
  //   })};
};

export default WarehouseInventory;
