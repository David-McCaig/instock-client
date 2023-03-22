import WarehouseDetailsList from '../../components/WarehouseDetails/WarehouseDetailsList.js';
import WarehouseInventory from '../../components/WarehouseInventory/WarehouseInventory.js';
import "./WarehouseDetailsPage.scss";

import { useState, useEffect } from "react";

import { useParams} from "react-router-dom";

import axios from "axios";


const WarehouseDetailsPage = () => {

    const urlForWarehouseList = "http://localhost:8000/warehouses/"
  
    const [warehouseToDisplay, setWarehouseToDisplay] = useState([]);
  
    const { id } = useParams();
  
    useEffect(() => {
      axios.get(urlForWarehouseList + id).then((response) => {
        setWarehouseToDisplay(response.data);
      }).catch((err)=>{
        console.log(err)
      });
    }, [id]);

    if(warehouseToDisplay.length === 0){

        <div>Loading....</div>
    }

    return (
        <div>
            <WarehouseDetailsList warehouseToDisplay={warehouseToDisplay}/>
            <WarehouseInventory id={id} />
        </div>
    );
};

export default WarehouseDetailsPage;