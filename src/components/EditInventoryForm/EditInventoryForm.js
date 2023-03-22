import React from 'react';

import "./EditInventoryForm.scss";

// import axios from "axios";

import arrowBack from "../../assets/images/icons/arrow_back-24px.svg";

import { Link, useNavigate } from 'react-router-dom';

import { useState} from "react";

import { useParams} from "react-router-dom";

import axios from "axios";

const EditInventoryForm = ({warehouseFilter, inventoryToDisplay}) => {

    const [updatedMessage, setupdatedMessage] = useState("");


    const initWarehouseName = warehouseFilter.find((warehouse)=>{
        return warehouse.id === inventoryToDisplay.warehouse_id
    })

    const [warehouseName, setWarehouseName] = useState(initWarehouseName.warehouse_name);

    const handleWarehouseNameChange = (event) => {
        setWarehouseName(event.target.value);
    };

    const { id } = useParams();

    let inventoryName = inventoryToDisplay.item_name;
    let inventoryDescription = inventoryToDisplay.description;
    let inventoryCategory = inventoryToDisplay.category;
    let inventoryStatus = inventoryToDisplay.status;
    let inventoryQuantity = inventoryToDisplay.quantity;

    const [itemName, setItemName] = useState(inventoryName);

    const handleItemNameChange = (event) => {
      setItemName(event.target.value);
    };

    const [description, setDescription] = useState(inventoryDescription);

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };

    const [category, setCategory] = useState(inventoryCategory);

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const [status, setStatus] = useState(inventoryStatus);

    const [quantity, setQuantity] = useState(inventoryQuantity);

    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };

    const handleStatusChange = (event) => {
        const target = event.target;
        if (target.checked) {
          setStatus(target.value);
        }

        if(target.value === "Out of Stock"){
            setQuantity(0)
        }

    };

    const navigateInventoryPage = useNavigate();

    const handleCancelClick = (event) => {
        event.preventDefault();
        navigateInventoryPage("/inventory")
    };


    const handleUpdateSaved = (event) => {
        event.preventDefault();
        const selectedWarehouse = warehouseFilter.find((warehouse)=>{
            return warehouse.warehouse_name === warehouseName
        })
            const urlForInventoryUpdate = `http://localhost:8000/inventories/${id}`
            axios
            .put(urlForInventoryUpdate, {
                warehouse_id: selectedWarehouse.id,
                item_name: itemName,
                description: description,
                category: category,
                status: status,
                quantity: quantity
            })
            .then(setupdatedMessage("Thank you for your upload"))
            .catch((error) => {
                console.log(error);
            });
    };

    if(!warehouseName|| !itemName || !description || !category || !status || !quantity || !initWarehouseName){
        <div>Loading....</div>
    }

    return (
        <div className="inventory-edit-form-top">
            <Link to={`/inventory`} ><div className="inventory-edit-form-top__nav-div">
                <img src={arrowBack} alt="Arrow back"></img>
                <h2>Edit Inventory Item</h2>
            </div></Link>
            <form onSubmit={handleUpdateSaved} className='inventory-edit-form'>
                <div className="inventory-edit-form__item-details">
                    <h2 className="inventory-edit-form__main-header">Item Details</h2>
                    <div>
                        <label className="inventory-edit-form__headings" htmlFor="name">Item Name</label>
                        <input type="text" value={itemName} onChange={handleItemNameChange} className="inventory-edit-form__name" id="name" name="name"></input>
                    </div>
                    <div>
                        <label className="inventory-edit-form__headings" htmlFor="description">Description</label>
                        <textarea type="text" value={description} onChange={handleDescriptionChange} className="inventory-edit-form__description" id="description" name="description"></textarea>
                    </div>
                    <div>
                        <label className="inventory-edit-form__headings" htmlFor="category">Category</label>
                        <select onChange={handleCategoryChange} className="inventory-edit-form__category" name="categories" id="category">
                        <option value={category}>{category}</option>
                        <option value="Health">Health</option>
                        <option value="Gear">Gear</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                </div>
                <div className="inventory-edit-form__item-availability">
                    <h2 className="inventory-edit-form__main-header">Item Availability</h2>
                    <div className="inventory-edit-form__status-container">
                        <div>
                            <label className="inventory-edit-form__headings">Status</label>
                            <div className="inventory-edit-form__everything-radio-container">
                                <div className="inventory-edit-form__radio-container">
                                    <input type="radio" id="in-stock" name="in-out-stock" value="In Stock" checked={status === "In Stock"} onChange={handleStatusChange}/>
                                    <label className="inventory-edit-form__label" htmlFor="in-stock">In stock</label>
                                </div>
                                <div className="inventory-edit-form__radio-container">
                                    <input type="radio" id="out-of-stock" name="in-out-stock" value="Out of Stock" checked={status === "Out of Stock"} onChange={handleStatusChange}/>
                                    <label className="inventory-edit-form__label" htmlFor="out-of-stock">Out of stock</label>
                                </div>
                            </div>
                        </div>
                        <div className="inventory-edit-form__quantity-container">
                            <label hidden={status === "Out of Stock"} className="inventory-edit-form__headings" htmlFor="quantity">Quantity</label>
                            <input hidden={status === "Out of Stock"} type="text" value={quantity} onChange={handleQuantityChange} className="inventory-edit-form__quantity" id="quantity"/>
                        </div>
                    <div>
                        <div>
                            <label className="inventory-edit-form__headings" htmlFor="warehouse">Warehouse</label>
                            <select onChange={handleWarehouseNameChange} className="inventory-edit-form__warehouse" name="categories" id="warehouse">
                            {warehouseFilter.map((warehouse, index)=>{
                               return <option key={index} value={warehouse.warehouse_name}>{warehouse.warehouse_name}</option>
                            })}
                            </select>
                        </div>
                        <p className="inventory-edit-form__message">{updatedMessage}</p>
                    </div>
                    </div>
                </div>
                <div className="inventory-edit-form__button-container">
                    <button onClick={handleCancelClick} className="inventory-edit-form__cancel-button">Cancel</button>
                    <button type="submit" className="inventory-edit-form__save-button">Save</button>
                </div>

                {/* <input type="text" value={inventoryWarehouse} className="comments__comment"></input> */}
                {/* <p>{inventoryWarehouse}</p> */}
            </form>
        </div>
    );
};

export default EditInventoryForm;


/* <form id="form" className="comments__form" onSubmit={submitForm}>
<div className="comments__comment-div">
  <div className="comments__conversation-div">
    <label htmlFor="comment" className="comments__join-conversation">
      JOIN THE CONVERSATION
    </label>
    <textarea onChange={handleCommentChange} value={comment} className="comments__comment" type="text" id="comment" name="comment" placeholder="Add a new comment"
      required></textarea>
  </div>
  <div className="comments__button-div">
    <button className="comments__comment-button">COMMENT</button>
  </div>
</div>
</form> */