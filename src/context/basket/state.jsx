import { useReducer } from "react";
import BasketContext from "./index";
import BasketReducer from "./reducer";

const BasketState = ({ children }) => {
  const initialState = {
    basketItems: [],
    total: 0,
  };
  const [state, dispatch] = useReducer(BasketReducer, initialState);

  const addToCart = (payload) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <BasketContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addToCart,
        clearCart,
        ...state,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketState;
