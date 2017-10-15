import React, { Component } from 'react';
import Header from './Header';
import IndexTokenForm from './IndexTokenForm';
import { connect } from 'react-redux';
import { initWeb3 } from '../redux/web3';

class SetPage extends Component {
  componentWillMount() {
    // Load Web3 into state on app init
    window.addEventListener('load', () => {
      this.props.initWeb3();
    });
  }

  render () {
    return (
      <div className="SetPage">
        <Header />
        <IndexTokenForm />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
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
)(SetPage);
