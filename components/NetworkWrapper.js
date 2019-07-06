import { NetInfo } from 'react-native';
import * as React from 'react';
import PropTypes from 'prop-types';
import connectionState from '../redux/actions/connection';

export default class NetworkWrapper extends React.PureComponent {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = isConnected =>
    this.props.dispatch(connectionState({ status: isConnected }));

  render() {
    const { children } = this.props;
    return children;
  }
}

NetworkWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
