import { createStore, applyMiddleware } from "redux";
import rootReducer from './Reducers';
import * as thunk from 'redux-thunk';
import { Store } from "redux";

const logger = (store: any) => (next: any) => (action: any) => {
  console.groupCollapsed(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};

export default function createAppStore() : Store<any>{
  const store = createStore(rootReducer, applyMiddleware(thunk.default, logger));

  // if (module.hot){
  //   module.hot.accept(() => {
  //     const rootReducer = require('./Reducers');
  //     store.replaceReducer(rootReducer);
  //   })
  // }

  return store;
}