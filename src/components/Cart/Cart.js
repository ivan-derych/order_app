import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmiting, setDidSubmiting] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  console.log(cartCtx.totalAmount);

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://max-meal-order-app-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmiting(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        {" "}
        Close{" "}
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          {" "}
          Order{" "}
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  const isSubmitingModalContent = <p>Sending the data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Seccesfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.actions} onClick={props.onClose}>
          {" "}
          Close{" "}
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmiting && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmiting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
