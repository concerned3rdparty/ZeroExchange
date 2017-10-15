import React, { Component } from 'react';
import Header from './Header';
import IndexTokenForm from './IndexTokenForm';
import { connect } from 'react-redux';
import { initWeb3 } from '../redux/web3';

import Loading from './Loading';

// What are my goals?
  // Demonstrate index token creation
  // Demonstrate index token issuance
  // BONUS: Demonstrate composable index token creation


class SetPage extends Component {
  componentWillMount() {
    // Load Web3 into state on app init
    window.addEventListener('load', () => {
      this.props.initWeb3();
    });
  }

  render () {
    const { connected } = this.props.web3;

    return (
      <div className="SetPage">
        <Header />
        {/*{connected ?*/}
          <IndexTokenForm />
        {/*: <Loading />}*/}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3: state.web3
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
)(SetPage);
