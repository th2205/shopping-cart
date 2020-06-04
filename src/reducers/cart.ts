export const ADD_TO_CART = 'ADD_TO_CART';

const initialState = {
  cart: []
};

export function addToCart() {
  return {
    type: ADD_TO_CART
  };
}

export default function service(state = initialState, action: any) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
}
