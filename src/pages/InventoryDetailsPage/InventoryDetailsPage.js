// import React from 'react';
import InventoryDetails from '../../components/InventoryDetails/InventoryDetails';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InventoryDetailsPage = () => {
    const { id } = useParams();
    const [inventoryItem, setInventoryItem] = useState(null)
    const [warehouse, setWarehouse] = useState(null)

    const inventoryRequestUrl = `http://localhost:8000/inventories/${id}`

    useEffect(() => {
        axios
            .get(inventoryRequestUrl)
            .then((response) => {
                setInventoryItem(response.data);
                const warehouseRequestUrl = `http://localhost:8000/warehouses/${response.data.warehouse_id}`
                axios
                    .get(warehouseRequestUrl)
                    .then((innerResponse) => {
                        setWarehouse(innerResponse.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
    })
        .catch((err) => {
            console.log(err);
        });
}, [inventoryRequestUrl]);

if (!inventoryItem) return <h2>loading...</h2>

    return (
        <div>
            <InventoryDetails inventoryItem={inventoryItem} warehouse={warehouse} />
        </div>
    );
};

export default InventoryDetailsPage;