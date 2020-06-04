export const ADD_SERVICE = 'ADD_SERVICE';
export const REMOVE_SERVICE = 'REMOVE_SERVICE';

export const ADD_DISCOUNT = 'ADD_DISCOUNT';
export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';

interface ServiceData {
  checked: boolean;
  count: number;
  id: string;
  name: string;
  price: number;
}

interface DiscountData {
  checked: boolean;
  rate: number;
  id: string;
  name: string;
}

interface CartState {
  serviceCart: Array<ServiceData>;
  discountCart: Array<DiscountData>;
}

const initialState: CartState = {
  serviceCart: [],
  discountCart: []
};

export const addService = (serviceData: ServiceData) => ({
  type: ADD_SERVICE,
  data: serviceData
});

export const removeService = (id: string) => ({
  type: REMOVE_SERVICE,
  data: id
});

export const addDiscount = (discountData: DiscountData) => ({
  type: ADD_DISCOUNT,
  data: discountData
});

export const removeDiscount = (id: string) => ({
  type: REMOVE_DISCOUNT,
  data: id
});

export default function cart(state: CartState = initialState, action: any) {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        serviceCart: [...state.serviceCart, action.data]
      };
    case REMOVE_SERVICE:
      const serviceId = action.data;

      return {
        ...state,
        serviceCart: state.serviceCart.filter(
          (service: ServiceData) => service.id !== serviceId
        )
      };
    case ADD_DISCOUNT:
      return {
        ...state,
        discountCart: [...state.discountCart, action.data]
      };
    case REMOVE_DISCOUNT:
      const discountId = action.data;

      return {
        ...state,
        discountCart: state.discountCart.filter(
          (discount: DiscountData) => discount.id !== discountId
        )
      };
    default:
      return state;
  }
}
