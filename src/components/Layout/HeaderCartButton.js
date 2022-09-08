import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";


const HeaderCartButton = (props) => {
  const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHightlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHightlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHightlighted(false);

      return () => {
        clearTimeout(timer);
      }
    }, 300)
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default React.memo(HeaderCartButton);
