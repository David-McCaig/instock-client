import React from 'react';
import EditWarehouseForm from '../../components/EditWarehouseForm/EditWarehouseForm';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";

const EditWarehousePage = () => {

    const [warehouse, setWarehouse] = useState('');

    const { id } = useParams();

    const warehouseRequestUrl = `http://localhost:8000/warehouses/${id}`

    useEffect(() => {
        axios
            .get(warehouseRequestUrl)
            .then((response) => {
                setWarehouse(response.data);
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [warehouseRequestUrl]);

    if (!warehouse) {
        return <div>loading...</div>
    }
    return (
        <div>
            <EditWarehouseForm warehouse={warehouse} setWarehouse={setWarehouse} />
        </div>
    );
};

export default EditWarehousePage;