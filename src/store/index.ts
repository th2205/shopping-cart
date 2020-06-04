import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';

const middleware: any = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// export default createStore(reducer, applyMiddleware(...middleware));

export default function configureStore() {
  const store = createStore(reducer, applyMiddleware(...middleware));

  return store;
}
