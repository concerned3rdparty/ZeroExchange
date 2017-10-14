import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import Orderbook from './Orderbook';
import { connect } from 'react-redux';
import { initWeb3 } from '../redux/web3';

class Home extends Component {
  componentWillMount() {
    // Load Web3 into state on app init
    window.addEventListener('load', () => {
      this.props.initWeb3();
    });
  }

  render () {
    return (
      <div className="Home">
        <Header />
        <Form />
        <Orderbook />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initWeb3: () => initWeb3(dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
