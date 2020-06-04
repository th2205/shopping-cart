import { combineReducers } from 'redux';
import cart from './cart';
import services from './services';

const rootReducer = combineReducers({
  cart,
  services
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
