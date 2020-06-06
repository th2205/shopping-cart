import { ServiceByIdTypes } from './services';

export const ADD_SERVICE = 'ADD_SERVICE' as const;
export const REMOVE_SERVICE = 'REMOVE_SERVICE' as const;

export const ADD_DISCOUNT = 'ADD_DISCOUNT' as const;
export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT' as const;

export const CHANGE_QUANTITY = 'CHANGE_QUANTITY' as const;

export const APPLY_DISCOUNT = 'APPLY_DISCOUNT' as const;
export const CANCEL_DISCOUNT = 'CANCEL_DISCOUNT' as const;

export const CALCULATE_PRICE = 'CALCULATE_PRICE' as const;

export interface ServiceData {
  [x: string]: any;
  checked: boolean;
  count: number;
  id: string;
  name: string;
  price: number;
}

export interface DiscountData {
  checked: boolean;
  rate: number;
  id: string;
  name: string;
  targets: string[];
  totalDiscount: number;
}

export interface CartState {
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

export const addDiscount = (
  discountData: DiscountData,
  serviceData: any,
  serviceById: ServiceByIdTypes
) => ({
  type: ADD_DISCOUNT,
  data: { discountData, serviceData, serviceById }
});

export const removeDiscount = (id: string) => ({
  type: REMOVE_DISCOUNT,
  data: id
});

export const changeQuantity = (id: string, quantity: number) => ({
  type: CHANGE_QUANTITY,
  data: { id, quantity }
});

export const calculatePrice = (serviceById: ServiceByIdTypes) => ({
  type: CALCULATE_PRICE,
  data: { serviceById }
});

export const applyDiscount = (serviceId: string, discountId: string) => ({
  type: APPLY_DISCOUNT,
  data: { serviceId, discountId }
});

type CartAction =
  | ReturnType<typeof addService>
  | ReturnType<typeof removeService>
  | ReturnType<typeof addDiscount>
  | ReturnType<typeof removeDiscount>
  | ReturnType<typeof changeQuantity>
  | ReturnType<typeof calculatePrice>
  | ReturnType<typeof applyDiscount>;

export default function cart(
  state: CartState = initialState,
  action: CartAction
) {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        serviceCart: [...state.serviceCart, action.data]
      };
    case REMOVE_SERVICE:
      const serviceId = action.data;
      const updatedDiscountCart = state.discountCart.map((discount) => {
        discount.targets = discount.targets.filter((id) => id !== serviceId);

        return discount;
      });

      return {
        ...state,
        serviceCart: state.serviceCart.filter(
          (service: ServiceData) => service.id !== serviceId
        ),
        discountCart: updatedDiscountCart
      };
    case ADD_DISCOUNT:
      const serviceData = action.data.serviceData;
      const discount = action.data.discountData;
      const targets = serviceData.map((data: ServiceData) => data.id);

      discount.targets = targets;

      return {
        ...state,
        discountCart: [...state.discountCart, discount]
      };
    case REMOVE_DISCOUNT:
      const discountId = action.data;

      return {
        ...state,
        discountCart: state.discountCart.filter(
          (discount: DiscountData) => discount.id !== discountId
        )
      };
    case CHANGE_QUANTITY:
      const id = action.data.id;
      const quantity = action.data.quantity;
      const newSerciveCart = [...state.serviceCart];
      const index = newSerciveCart.findIndex((service) => service.id === id);

      newSerciveCart[index].count = quantity;

      return {
        ...state,
        serviceCart: newSerciveCart
      };
    case APPLY_DISCOUNT:
      const allSelectedServiceId = state.serviceCart.map(
        (service) => service.id
      );
      const selectedServiceId = action.data.serviceId;
      const selectedDiscountId = action.data.discountId;
      const newDiscountCart = [...state.discountCart];
      const discountIndex = newDiscountCart.findIndex(
        (dicountData) => dicountData.id === selectedDiscountId
      );

      if (selectedServiceId === 'all') {
        newDiscountCart[discountIndex].targets = [...allSelectedServiceId];
      } else {
        newDiscountCart[discountIndex].targets = [selectedServiceId];
      }

      return {
        ...state,
        discountCart: newDiscountCart
      };
    case CALCULATE_PRICE:
      const CalculatedDiscountCart = state.discountCart.map((discountData) => {
        const serviceById = action.data.serviceById;
        const targets = discountData.targets;
        const totalDiscount = targets.reduce((acc: number, cur: string) => {
          const count = serviceById[cur].count;
          const price = serviceById[cur].price;
          const rate = discountData.rate;

          return acc + price * count * rate;
        }, 0);

        discountData.totalDiscount = Math.round(totalDiscount);

        return discountData;
      });

      return {
        ...state,
        discountCart: CalculatedDiscountCart
      };
    default:
      return state;
  }
}
