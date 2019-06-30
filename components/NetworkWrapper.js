import { NetInfo } from 'react-native';
import connectionState from '../redux/actions/connection';

import * as React from 'react';

export default class NetworkWrapper extends React.PureComponent {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    this.props.dispatch(connectionState({ status: isConnected }));
  };

  render() {
    return (
      this.props.children
    )
  }
}