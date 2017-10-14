import { combineReducers } from 'redux';
import { reducer as web3 } from './web3';

const reducer = combineReducers({
  web3,
});

export default reducer;
