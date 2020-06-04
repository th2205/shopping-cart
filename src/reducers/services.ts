import { fetchService } from '../utils/api';

export interface ServiceState {
  serviceById: ServiceByIdTypes;
  allServiceIds: string[];
  discountById: {};
  allDiscountIds: string[];
  currency_code: string;
  loading: boolean;
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

export const GET_SERVICE_REQUEST = 'GET_SERVICE_REQUEST';
export const GET_SERVICE_SUCCESS = 'GET_SERVICE_SUCCESS';
export const GET_SERVICE_FAILURE = 'GET_SERVICE_FAILURE';

export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';

export const getService = (dispatch: any) => async () => {
  dispatch({ type: GET_SERVICE_REQUEST });

  try {
    const { data } = await fetchService();

    dispatch({ type: GET_SERVICE_SUCCESS, data });
  } catch (err) {
    dispatch({ type: GET_SERVICE_FAILURE });
  }
};

export const toggleCheckbox = (id: string) => ({
  type: TOGGLE_CHECKBOX,
  data: id
});

const initialState: ServiceState = {
  serviceById: {},
  allServiceIds: [],
  discountById: {},
  allDiscountIds: [],
  currency_code: '',
  loading: false
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
          acc[id] = discount;

          return acc;
        }, {}),
        allDiscountIds: Object.keys(discounts),
        loading: false
      };
    case GET_SERVICE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case TOGGLE_CHECKBOX:
      const newServiceById: any = { ...state.serviceById };
      const id = action.data;

      newServiceById[id].checked = !newServiceById[id].checked;

      return {
        ...state,
        serviceById: newServiceById
      };
    default:
      return state;
  }
}
