import "./WarehouseList.scss";

import WarehouseListAll from "./WareHouseListAll.js";

const WarehouseList = ({ warehouses, setwarehouseToDisplay }) => {
  return (
    <>
      {warehouses.map((warehouse) => {
        return (
          <>
            <WarehouseListAll
              key={warehouse.id}
              id={warehouse.id}
              warehouseName={warehouse.warehouse_name}
              warehouseAddress={warehouse.address}
              city={warehouse.city}
              country={warehouse.country}
              warehouseContact={warehouse.contact_name}
              warehousePhone={warehouse.contact_phone}
              warehouseEmail={warehouse.contact_email}
              setwarehouseToDisplay={setwarehouseToDisplay}
              warehouses={warehouses}
            />
          </>
        );
      })}
    </>
  );
};

export default WarehouseList;
