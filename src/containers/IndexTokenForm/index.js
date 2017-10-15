import React, { Component } from 'react';

import TokenName from '../TokenName';
import TokenSelection from '../TokenSelection';
import TokenQuantity from '../TokenQuantity';
import TokenSummary from '../TokenSummary';
import FundSelection from '../FundSelection';
import IssueApproval from '../IssueApproval';
// import IssueTransfer from '../IssueTransfer';

import {
  input,
  select,
  label,
  Icon,
  Button,
  Dialog,
  Intent,
  Classes,
  IBackdropProps,
  IOverlayableProps
} from '@blueprintjs/core';
import './IndexTokenForm.css';

class IndexTokenForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: 1,
      fieldValues: {
        name: 'PredictionIndexToken',
        symbol: 'PIT',
        tokens: [
          { address: '0x6fcdcb587ee39b74bcfb57559262358d2a25816d', name: "Gnosis", symbol: 'GNO' }, 
          { address: '0x3f8d02f85bf5dc17c5fb83a73ca8c34c1ef06d0f', name: "Augur", symbol: 'REP' }
        ],
        units: [1, 2]
      },
      selectedIndexFund: null
    }

    this.saveFieldData = this.saveFieldData.bind(this); 
    this.saveIndexFund = this.saveIndexFund.bind(this); 
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
  }

  saveFieldData(data) {
    var oldData = this.state.fieldValues;
    var newData = Object.assign({}, oldData, data);
    this.setState({ fieldValues: newData });
  }

  saveIndexFund(data) {
    this.setState({ selectedIndexFund: data });
  }  

  nextStep() {
    this.setState({ steps: this.state.steps + 1 });
  }

  previousStep() {
    this.setState({ steps: this.state.steps - 1 });
  }

  render () {
    const { fieldValues } = this.state;

    switch (this.state.steps) {
      case 1: 
        return <TokenName 
          name={fieldValues.name}
          symbol={fieldValues.symbol}
          saveData={this.saveFieldData}
          nextStep={this.nextStep}
        />
      case 2: 
        return <TokenSelection
          tokens={fieldValues.tokens}
          saveData={this.saveFieldData}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      case 3: 
        return <TokenQuantity
          tokens={fieldValues.tokens}
          units={fieldValues.units} 
          saveData={this.saveFieldData}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      case 4: 
        return <TokenSummary
          name={fieldValues.name}
          symbol={fieldValues.symbol}
          tokens={fieldValues.tokens}
          units={fieldValues.units} 
          saveData={this.saveFieldData}
          nextStep={this.nextStep}
        />
      case 5: 
        return <FundSelection
          saveData={this.saveIndexFund}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />
      case 6: 
        return <IssueApproval
          selectedFund={this.state.selectedIndexFund}
          nextStep={this.nextStep}
          previousStep={this.previousStep}
        />      
      // case 7: 
      //   return <IssueTransfer
      //     saveData={this.saveData}
      //     nextStep={this.nextStep}
      //     previousStep={this.previousStep}
      //   />      
    }
  }
}

export default IndexTokenForm;
