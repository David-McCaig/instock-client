import InventoryListItem from "./InventoryListItem.js";

const InventoryList = ({ inventory, setInventoryToDisplay }) => {
  return (
    <>
      {inventory.map((inventoryItem) => {
        return (
          <InventoryListItem
            key={inventoryItem.id}
            id={inventoryItem.id}
            warehouse={inventoryItem.warehouse_name}
            item={inventoryItem.item_name}
            category={inventoryItem.category}
            status={inventoryItem.status}
            quantity={inventoryItem.quantity}
            setInventoryToDisplay={setInventoryToDisplay}
            inventory={inventory}
          />
        );
      })}
    </>
  );
};

export default InventoryList;
