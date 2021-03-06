import { fetchService } from '../utils/api';
import { ServiceData, DiscountData, TargetData } from '../reducers/cart';

export interface ServiceState {
  serviceById: ServiceByIdTypes;
  allServiceIds: string[];
  discountById: DiscountByIdTypes;
  allDiscountIds: string[];
  currencyCode: string;
  loading: boolean;
  errorMessage: string;
}

export interface ServiceByIdTypes {
  [key: string]: {
    name: string;
    price: number;
    checked: boolean;
    count: number;
    id: string;
  };
}

export interface DiscountByIdTypes {
  [key: string]: {
    id: string;
    name: string;
    rate: number;
    checked: boolean;
    targets: TargetData[];
  };
}

export const GET_SERVICE_REQUEST = 'GET_SERVICE_REQUEST' as const;
export const GET_SERVICE_SUCCESS = 'GET_SERVICE_SUCCESS' as const;
export const GET_SERVICE_FAILURE = 'GET_SERVICE_FAILURE' as const;

export const TOGGLE_SERVICE_CHECKBOX = 'TOGGLE_SERVICE_CHECKBOX' as const;
export const TOGGLE_DISCOUNT_CHECKBOX = 'TOGGLE_DISCOUNT_CHECKBOX' as const;

export const CHANGE_SERVICE_CHECKBOX = 'CHANGE_SERVICE_CHECKBOX' as const;
export const CHANGE_DISCOUNT_CHECKBOX = 'CHANGE_DISCOUNT_CHECKBOX' as const;

export const getService = (dispatch: (action: object) => void) => async () => {
  dispatch({ type: GET_SERVICE_REQUEST });

  try {
    const { data } = await fetchService();

    dispatch({ type: GET_SERVICE_SUCCESS, data });
  } catch (err) {
    dispatch({ type: GET_SERVICE_FAILURE });
  }
};

export const toggleServiceCheckbox = (id: string) => ({
  type: TOGGLE_SERVICE_CHECKBOX,
  data: id
});

export const toggleDiscountCheckbox = (id: string) => ({
  type: TOGGLE_DISCOUNT_CHECKBOX,
  data: id
});

export const changeServiceCheckbox = (serviceCart: ServiceData) => ({
  type: CHANGE_SERVICE_CHECKBOX,
  data: serviceCart
});

export const changeDiscountCheckbox = (discountCart: DiscountData) => ({
  type: CHANGE_DISCOUNT_CHECKBOX,
  data: discountCart
});

export const initialState: ServiceState = {
  serviceById: {},
  allServiceIds: [],
  discountById: {},
  allDiscountIds: [],
  currencyCode: 'KRW',
  loading: false,
  errorMessage: ''
};

export default function service(
  state: ServiceState = initialState,
  action: any
) {
  switch (action.type) {
    case GET_SERVICE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_SERVICE_SUCCESS:
      const itmes = action.data.items;
      const discounts = action.data.discounts;

      return {
        ...state,
        serviceById: Object.entries(itmes).reduce((acc: any, cur: any) => {
          const [id, service] = cur;

          service.id = id;
          service.checked = false;
          acc[id] = service;

          return acc;
        }, {}),
        allServiceIds: Object.keys(itmes),
        discountById: Object.entries(discounts).reduce((acc: any, cur: any) => {
          const [id, discount] = cur;

          discount.id = id;
          discount.checked = false;
          discount.targets = [];
          discount.totalDiscount = 0;
          acc[id] = discount;

          return acc;
        }, {}),
        allDiscountIds: Object.keys(discounts),
        currencyCode: action.data.currency_code,
        loading: false
      };
    case GET_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: '잠시후 다시 시도해주세요'
      };
    case TOGGLE_SERVICE_CHECKBOX:
      const newServiceById: any = { ...state.serviceById };
      const serviceId = action.data;

      newServiceById[serviceId].checked = !newServiceById[serviceId].checked;

      return {
        ...state,
        serviceById: newServiceById
      };
    case TOGGLE_DISCOUNT_CHECKBOX:
      const newDiscountById: any = { ...state.discountById };
      const discountId = action.data;

      newDiscountById[discountId].checked = !newDiscountById[discountId]
        .checked;

      return {
        ...state,
        discountById: newDiscountById
      };
    case CHANGE_SERVICE_CHECKBOX:
      const serviceCart = action.data;
      const serviceByIdCopy = { ...state.serviceById };

      for (let key in serviceByIdCopy) {
        serviceByIdCopy[key].checked = false;
      }

      serviceCart.forEach((service: ServiceData) => {
        const id = service.id;
        for (let key in serviceByIdCopy) {
          if (id === key) serviceByIdCopy[key].checked = true;
        }
      });

      return {
        ...state,
        serviceById: serviceByIdCopy
      };
    case CHANGE_DISCOUNT_CHECKBOX:
      const discountCart = action.data;
      const dicountByIdCopy = { ...state.discountById };

      for (let key in dicountByIdCopy) {
        dicountByIdCopy[key].checked = false;
      }

      discountCart.forEach((discount: DiscountData) => {
        const id = discount.id;
        for (let key in dicountByIdCopy) {
          if (id === key) dicountByIdCopy[key].checked = true;
        }
      });

      return {
        ...state,
        discountById: dicountByIdCopy
      };
    default:
      return state;
  }
}
