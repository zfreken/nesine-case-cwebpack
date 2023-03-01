import { ADD_TO_CART, CLEAR } from "./type.jsx";

export const sumItems = (basket) => {
  const total = basket
    .reduce((total, item) => total + parseFloat(item.value), 0)
    .toFixed(10);
  return { total };
};

const BasketReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const found = state.basketItems.findIndex(
        (r) =>
          r.rowId === action.payload.rowId &&
          r.columnId === action.payload.columnId
      );
      const updatedList = [...state.basketItems].filter(
        (item) => item.rowId !== action.payload.rowId
      );
      const newData = [
        ...updatedList,
        ...(found != -1 ? [] : [action.payload]),
      ];
      return {
        ...state,
        ...sumItems(newData),
        basketItems: newData,
      };

    case CLEAR:
      return {
        basketItems: [],
        total: 0,
      };

    default:
      return state;
  }
};

export default BasketReducer;
