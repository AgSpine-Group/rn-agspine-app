import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const MonoText = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

MonoText.propTypes = {
  // eslint-disable-next-line
  style: PropTypes.object,
};

MonoText.defaultProps = {
  style: {},
};

export default MonoText;
