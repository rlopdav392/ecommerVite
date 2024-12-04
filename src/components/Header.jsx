import { useRef } from "react";

import CartModal from "./CartModal.jsx";
import { useSelector } from "react-redux";

import Cart from "./Cart.jsx";

export default function Header() {
  const modal = useRef();

  const items = useSelector((state) => state.cart.items);

  const totalCartItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  /*   let totalCartItems = 0;

  items.forEach((item) => {
    totalCartItems += item.quantity;
  }); */

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (totalCartItems > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
        ContentComponent={Cart}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({totalCartItems})</button>
        </p>
      </header>
    </>
  );
}
