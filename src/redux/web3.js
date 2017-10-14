/**
 * Web3 Actions and Reducers
 */

import Web3 from 'web3';
import { emptyActionGenerator } from './helpers';


// Actions
const CONNECTED = 'web3/CONNECTED';
const DISCONNECTED = 'web3/DISCONNECTED';

const connectWeb3 = emptyActionGenerator(CONNECTED);
const disconnectWeb3 = emptyActionGenerator(DISCONNECTED);


// Public Action
export function initWeb3 (dispatch) {

    /*global web3*/
    /*eslint no-undef: ["error", { "typeof": true }] */

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // // Use Mist/MetaMask's provider
        console.log('Mist detected', web3.currentProvider);
        window.web3 = new Web3(web3.currentProvider);
        dispatch(connectWeb3());
    } else {
        // We could dispatch our own web3 provider here if we wanted to ...
        console.log('No web3? You should consider trying MetaMask!');
        dispatch(disconnectWeb3());
    }

}

// Reducer
const _web3State = {
  connected: false
};

export const reducer = (state = _web3State, action) => {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        connected: true
      };
    case DISCONNECTED:
      return {
        ...state,
        connected: false
      };
  }

  return state;
};
