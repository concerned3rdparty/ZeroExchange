import { combineReducers } from 'redux';
import { reducer as web3 } from './web3';
import { reducer as orderbook } from './orderbook';

const reducer = combineReducers({
  web3,
  orderbook
});

export default reducer;
