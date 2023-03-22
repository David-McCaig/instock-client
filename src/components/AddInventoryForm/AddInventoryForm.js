import "./AddInventoryForm.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import arrowBack from "../../assets/images/icons/arrow_back-24px.svg";

const AddInventoryForm = () => {
  //Navigation
  const navigate = useNavigate();

  //State Variables
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const [values, setValues] = useState({
    warehouse_id: "",
    item_name: "",
    description: "",
    category: "",
    status: "In Stock",
    quantity: "",
  });

  //Fetch warehouse list
  const urlForWarehouseList = "http://localhost:8000/warehouses";
  useEffect(() => {
    axios
      .get(urlForWarehouseList)
      .then(({ data }) => {
        setWarehouseList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Handle Status Change
  const handleStatusChange = (event) => {
    //In stock radio button checked
    if (event.target.checked) {
      setValues({
        ...values,
        status: event.target.value,
        quantity: "",
      });
    }
    //Out of stock radio button checked
    if (event.target.value === "Out of Stock") {
      setValues({
        ...values,
        status: event.target.value,
        quantity: 0,
      });
    }
  };

  //Handle Cancel Button
  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/inventory");
  };
  //Handle Save Button
  const handleUpdateSaved = (event) => {
    event.preventDefault();
    //Fetch inventory endpoint
    const urlForInventoryAdd = `http://localhost:8000/inventories/`;
    //POST request to add inventory item
    axios
      .post(urlForInventoryAdd, {
        warehouse_id: values.warehouse_id,
        item_name: values.item_name,
        description: values.description,
        category: values.category,
        status: values.status,
        quantity: values.quantity,
      })
      //Confirm successful item add message
      .then(({ data }) => {
        setConfirmationMessage(`${data.item_name} added to inventory!`);
      })
      //Confirm unsuccessful item add message
      .catch((error) => {
        console.log(error);
        setConfirmationMessage(
          `Unable to add ${values.item_name} to inventory!`
        );
      });
  };

  return (
    //Add Form Heading
    <div className="inventory-add-form-top">
      <Link to={`/inventory`}>
        <div className="inventory-add-form-top__nav-div">
          <img src={arrowBack} alt="Arrow back"></img>
          <h2>Add Inventory Item</h2>
        </div>
      </Link>

      {/* Add Form */}
      <form onSubmit={handleUpdateSaved} className="inventory-add-form">
        {/* Item Details */}
        <div className="inventory-add-form__item-details">
          <h2 className="inventory-add-form__main-header">Item Details</h2>
          {/* Item Name */}
          <div>
            <label className="inventory-add-form__headings" htmlFor="item_name">
              Item Name
            </label>
            <input
              type="text"
              value={values.item_Name}
              onChange={handleInputChange}
              className="inventory-add-form__name"
              id="item_name"
              name="item_name"
              placeholder="Item Name"
            ></input>
          </div>
          {/* Item Description */}
          <div>
            <label
              className="inventory-add-form__headings"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              type="text"
              value={values.description}
              onChange={handleInputChange}
              className="inventory-add-form__description"
              id="description"
              name="description"
              placeholder="Please enter a brief item description..."
            ></textarea>
          </div>
          {/* Item Category Dropdown */}
          <div>
            <label className="inventory-add-form__headings" htmlFor="category">
              Category
            </label>
            <select
              onChange={handleInputChange}
              className="inventory-add-form__category"
              name="category"
              id="category"
              placeholder="Please select"
            >
              <option value="">Please Select</option>
              <option value="Health">Health</option>
              <option value="Gear">Gear</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
        {/* Item Availability */}
        <div className="inventory-add-form__item-availability">
          <h2 className="inventory-add-form__main-header">Item Availability</h2>
          <div className="inventory-add-form__status-container">
            {/* Item Status */}
            <div>
              <label className="inventory-add-form__headings">Status</label>
              <div className="inventory-add-form__everything-radio-container">
                <div className="inventory-add-form__radio-container">
                  <input
                    type="radio"
                    id="in-stock"
                    name="in-out-stock"
                    value="In Stock"
                    checked={values.status === "In Stock"}
                    onChange={handleStatusChange}
                  />
                  <label
                    className="inventory-add-form__label"
                    htmlFor="in-stock"
                  >
                    In stock
                  </label>
                </div>
                <div className="inventory-add-form__radio-container">
                  <input
                    type="radio"
                    id="out-of-stock"
                    name="in-out-stock"
                    value="Out of Stock"
                    checked={values.status === "Out of Stock"}
                    onChange={handleStatusChange}
                  />
                  <label
                    className="inventory-add-form__label"
                    htmlFor="out-of-stock"
                  >
                    Out of stock
                  </label>
                </div>
              </div>
            </div>
            {/* Item Quantity */}
            <div className="inventory-add-form__quantity-container">
              <label
                hidden={values.status === "Out of Stock"}
                className="inventory-add-form__headings"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                hidden={values.status === "Out of Stock"}
                type="text"
                value={values.quantity}
                onChange={handleInputChange}
                className="inventory-add-form__quantity"
                id="quantity"
                name="quantity"
                placeholder="Insert Quantity"
              />
            </div>
            {/* Warehouse Dropdown Menu */}
            <div>
              <div>
                <label
                  className="inventory-add-form__headings"
                  htmlFor="warehouse"
                >
                  Warehouse
                </label>
                <select
                  onChange={handleInputChange}
                  className="inventory-add-form__warehouse"
                  name="warehouse_id"
                  id="warehouse_id"
                >
                  <option value="">Please Select</option>
                  {warehouseList.map((warehouse, index) => {
                    return (
                      <option key={index} value={warehouse.id}>
                        {warehouse.warehouse_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <p className="inventory-add-form__message">
                {confirmationMessage}
              </p>
            </div>
          </div>
        </div>

        <div className="inventory-add-form__button-container">
          {/* Cancel Button */}
          <button
            onClick={handleCancelClick}
            className="inventory-add-form__cancel-button"
          >
            Cancel
          </button>
          {/* Add Button */}
          <button type="submit" className="inventory-add-form__add-button">
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventoryForm;
