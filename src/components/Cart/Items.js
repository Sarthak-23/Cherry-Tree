import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCartItem, addProduct, reduceCartItem } from '../../redux/Cart/cart.actions'
import { FaMinus, FaPlus,FaTrashAlt } from "react-icons/fa";

const Items = (products) => {
    const dispatch = useDispatch();
    const {name,url,price,documentID,quantity} = products
    
    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (products) => {
        dispatch(
            addProduct(products)
        )
    }

    const handleReduceItem = (products) => {
        dispatch(
            reduceCartItem(products)
        )
    }

    return (
        <>
           <div className="items-info">
                <div className="product-img mt-4 mr-2">
                    <img src={url} alt={name} />
                </div>

                <div className="title">
                    <h2>{name}</h2>
                    <p>Quantity: {quantity}</p>
                </div>

                <div className="add-minus-quantity">
                    <FaMinus className="button minusbutton" onClick={()=> handleReduceItem(products)}/>
                    <input type="text" placeholder={quantity*price} disabled />
                    <FaPlus className="button addbutton" onClick={()=> handleAddProduct(products)} />
                </div>

                <div className="price">
                    <h3>₹ {price}</h3>
                </div>

                <div className="remove-item">
                    <FaTrashAlt className="button trash" onClick={()=> handleRemoveCartItem(documentID)} />
                </div>
            </div>
            <hr /> 
        </>
    )
}

export default Items
