import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import Orderbook from './Orderbook';
import Loading from './Loading';
import { connect } from 'react-redux';
import { initWeb3 } from '../redux/web3';

class Home extends Component {

  componentWillMount () {
    // Load Web3 into state on app init
    window.addEventListener('load', () => {
      this.props.initWeb3();
    });
  }

  render () {
    const { connected } = this.props.web3;
    return (
      <div className="Home">
        <Header />
        {connected ?
          <div>
            <Form />
            <Orderbook orderbook={this.props.orderbook} />
          </div>
        : <Loading />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    web3: state.web3,
    orderbook: state.orderbook
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initWeb3: () => initWeb3(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
