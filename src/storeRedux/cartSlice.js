import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("shoppingCart");
  return storedCart ? JSON.parse(storedCart).items : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("shoppingCart", JSON.stringify({ items: cart }));
};

const initialState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log("metodo additem de mi reduce");
      console.log(`añado ${action.payload.id} a ${state.items}`);
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.id
        );
        state.items.push({ ...product, quantity: 1 });
      }
      saveCartToLocalStorage(state.items);
    },
    updateCartItem(state, action) {
      const existingCartItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      existingCartItem.quantity += action.payload.amount;

      if (existingCartItem.quantity <= 0) {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(existingCartItemIndex, 1);
      }

      saveCartToLocalStorage(state.items);
    },
  },
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartActions };

export default cartReducer;
