import { combineReducers } from 'redux';
import cart from './cart';

const rootReducer = combineReducers({
  cart
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
