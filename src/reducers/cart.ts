import { ServiceByIdTypes } from './services';
import _ from 'lodash';

export const ADD_SERVICE = 'ADD_SERVICE' as const;
export const REMOVE_SERVICE = 'REMOVE_SERVICE' as const;
export const COMPLETE_SERVICE = 'COMPLETE_SERVICE' as const;
export const REMOVE_SUB_SERVICE_CART = 'REMOVE_SUB_SERVICE_CART' as const;
export const RESET_SEB_SERVICE_CART = 'RESET_SEB_SERVICE_CART' as const;

export const ADD_DISCOUNT = 'ADD_DISCOUNT' as const;
export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT' as const;
export const COMPLETE_DISCOUNT = 'COMPLETE_DISCOUNT' as const;
export const REMOVE_SUB_DISCOUNT_CART = 'REMOVE_SUB_DISCOUNT_CART' as const;
export const RESET_SEB_DISCOUNT_CART = 'RESET_SEB_DISCOUNT_CART' as const;

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
  [x: string]: any;
  checked: boolean;
  rate: number;
  id: string;
  name: string;
  targets: TargetData[];
  totalDiscount: number;
}

export interface TargetData {
  id: string;
  checked: boolean;
}

export interface CartState {
  subServiceCart: ServiceData[];
  subDiscountCart: DiscountData[];
  serviceCart: ServiceData[];
  discountCart: DiscountData[];
}

const initialState: CartState = {
  subServiceCart: [],
  subDiscountCart: [],
  serviceCart: [],
  discountCart: []
};

export const addService = (serviceData: ServiceData, quantity: number) => ({
  type: ADD_SERVICE,
  data: { serviceData, quantity }
});

export const removeService = (id: string) => ({
  type: REMOVE_SERVICE,
  data: id
});

export const completeService = () => ({ type: COMPLETE_SERVICE });

export const removeSubServiceCartItem = (id: string) => ({
  type: REMOVE_SUB_SERVICE_CART,
  data: id
});

export const removeAllSubServiceCartItem = () => ({
  type: RESET_SEB_SERVICE_CART
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

export const completeDiscount = () => ({ type: COMPLETE_DISCOUNT });

export const removeSubDiscountCartItem = (id: string) => ({
  type: REMOVE_SUB_DISCOUNT_CART,
  data: id
});

export const removeAllSubDiscountCartItem = () => ({
  type: RESET_SEB_DISCOUNT_CART
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
  | ReturnType<typeof applyDiscount>
  | ReturnType<typeof completeService>
  | ReturnType<typeof removeSubServiceCartItem>
  | ReturnType<typeof removeAllSubServiceCartItem>
  | ReturnType<typeof completeDiscount>
  | ReturnType<typeof removeSubDiscountCartItem>
  | ReturnType<typeof removeAllSubDiscountCartItem>;

export default function cart(
  state: CartState = initialState,
  action: CartAction
) {
  switch (action.type) {
    case ADD_SERVICE:
      const selectedService = action.data.serviceData;
      const count = action.data.quantity;
      selectedService.count = count;

      return {
        ...state,
        subServiceCart: [...state.subServiceCart, selectedService]
      };
    case REMOVE_SERVICE:
      const serviceId = action.data;
      const updatedDiscountCart = state.discountCart.map((discount) => {
        discount.targets = discount.targets.filter(
          (targetObj) => targetObj.id !== serviceId
        );

        return discount;
      });

      return {
        ...state,
        serviceCart: state.serviceCart.filter(
          (service: ServiceData) => service.id !== serviceId
        ),
        discountCart: updatedDiscountCart
      };
    case REMOVE_SUB_SERVICE_CART:
      const sebServiceId = action.data;

      return {
        ...state,
        subServiceCart: state.subServiceCart.filter(
          (service: ServiceData) => service.id !== sebServiceId
        )
      };
    case RESET_SEB_SERVICE_CART:
      return {
        ...state,
        subServiceCart: state.serviceCart
      };
    case COMPLETE_SERVICE:
      const discountCartCopy = [...state.discountCart];
      const subServiceCartCopy = [...state.subServiceCart];
      const targetServices = subServiceCartCopy.map((data: ServiceData) => ({
        id: data.id,
        checked: true
      }));

      if (discountCartCopy.length) {
        discountCartCopy.forEach((discount) => {
          discount.targets = targetServices;
        });
      }

      return {
        ...state,
        serviceCart: state.subServiceCart,
        discountCart: discountCartCopy
      };
    case ADD_DISCOUNT:
      const serviceData = action.data.serviceData;
      const discount = action.data.discountData;
      const targets = serviceData.map((data: ServiceData) => ({
        id: data.id,
        checked: true
      }));

      discount.targets = targets;

      return {
        ...state,
        subDiscountCart: [...state.subDiscountCart, discount]
      };
    case REMOVE_DISCOUNT:
      const discountId = action.data;

      return {
        ...state,
        discountCart: state.discountCart.filter(
          (discount: DiscountData) => discount.id !== discountId
        )
      };
    case REMOVE_SUB_DISCOUNT_CART:
      const sebDiscountId = action.data;

      return {
        ...state,
        subDiscountCart: state.subDiscountCart.filter(
          (discount: DiscountData) => discount.id !== sebDiscountId
        )
      };
    case RESET_SEB_DISCOUNT_CART:
      return {
        ...state,
        subDiscountCart: state.discountCart
      };
    case COMPLETE_DISCOUNT:
      return {
        ...state,
        discountCart: state.subDiscountCart
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
      const targetId = action.data.serviceId;
      const selectedDiscountId = action.data.discountId;
      const newDiscountCart = [...state.discountCart];
      const discountIndex = newDiscountCart.findIndex(
        (dicountData) => dicountData.id === selectedDiscountId
      );
      const dicountTarget = newDiscountCart[discountIndex];
      const targetIndex = dicountTarget.targets.findIndex(
        (targetObj) => targetObj.id === targetId
      );

      dicountTarget.targets[targetIndex].checked = !dicountTarget.targets[
        targetIndex
      ].checked;

      return {
        ...state,
        discountCart: newDiscountCart
      };
    case CALCULATE_PRICE:
      const CalculatedDiscountCart = state.discountCart.map((discountData) => {
        const serviceById = action.data.serviceById;
        const targets = discountData.targets;
        const totalDiscount = targets.reduce((acc: number, cur: TargetData) => {
          if (cur.checked) {
            const count = serviceById[cur.id].count;
            const price = serviceById[cur.id].price;
            const rate = discountData.rate;

            return acc + price * count * rate;
          } else {
            return acc + 0;
          }
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
