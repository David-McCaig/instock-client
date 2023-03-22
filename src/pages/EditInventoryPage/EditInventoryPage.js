

import EditInventoryForm from '../../components/EditInventoryForm/EditInventoryForm.js';

import { useState, useEffect } from "react";

import { useParams} from "react-router-dom";

import axios from "axios";


const EditInventoryPage = () => {

    const urlForInventoryItem = "http://localhost:8000/inventories/"
  
    const [inventoryToDisplay, setInventoryToDisplay] = useState(null);
  
    const { id } = useParams();
  
    useEffect(() => {
      axios.get(urlForInventoryItem + id).then((response) => {
        setInventoryToDisplay(response.data);
      }).catch((err)=>{
        console.log(err)
      });
    }, [id]);

    const urlForWarehouseList = "http://localhost:8000/warehouses";

    const [warehouseToDisplay, setwarehouseToDisplay] = useState(null);
  
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


    if(!inventoryToDisplay || !warehouseToDisplay){
        return <div>Loading....</div>
    }


    const warehouseFilter = warehouseToDisplay.map((warehouse)=>{
        return {
            warehouse_name: warehouse.warehouse_name,
            id: warehouse.id
        }
    })

    return (
        <div className="inventory">
            <EditInventoryForm warehouseFilter={warehouseFilter} inventoryToDisplay={inventoryToDisplay}/>
        </div>
        );
};

export default EditInventoryPage;