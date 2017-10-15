import { payloadActionGenerator } from './helpers';
import client from '../helpers/socket';
const BigNumber = require('bignumber.js');

// Actions
const ORDERCREATED = 'socket/ORDERCREATED';
const ORDERFILLED = 'socket/ORDERFILLED';
const ORDERCANCELED = 'socket/ORDERCANCELED';

const orderCreated = payloadActionGenerator(ORDERCREATED);
const orderFilled = payloadActionGenerator(ORDERFILLED);
const orderCanceled = payloadActionGenerator(ORDERCANCELED);

// Public Actions
export function initSockets (dispatch, data) {
  console.log('initialized sockets');
  // New order action
  client.event.subscribe('orders', function (data) {
    console.log('New order!', data);
    data.expirationUnixTimestampSec = new BigNumber(data.expirationUnixTimestampSec);
    data.makerTokenAmount = new BigNumber(data.makerTokenAmount);
    data.takerTokenAmount = new BigNumber(data.takerTokenAmount);
    return dispatch(orderCreated(data));
  });
  // Filled order action
  client.event.subscribe('fills', function (data) {
    console.log('New fill!', data);
    return dispatch(orderFilled(data));
  });
  // Canceled order action
  client.event.subscribe('cancels', function (data) {
    console.log('New cancel!', data);
    return dispatch(orderCanceled(data));
  });
}

// Reducer
const _orderbookState = {
  orders: [],
  trades: [],
  cancels: []
};

export const reducer = (state = _orderbookState, action) => {
  switch (action.type) {
    case ORDERCREATED:
      return {
        ...state,
        orders: state.orders.concat(action.payload)
      };
    case ORDERFILLED:
      return {
        ...state,
        trades: state.trades.concat(action.payload)
      };
    case ORDERCANCELED:
      return {
        ...state,
        cancels: state.cancels.concat(action.payload)
      };
  }

  return state;
};
