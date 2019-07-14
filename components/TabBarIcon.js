import React from 'react';
import * as Icon from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Colors, { PRIMARY } from '../constants/Colors';

export const TabBarIcon = props => (
  <Icon.Ionicons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);

export const MaterialCommunityIcons = props => (
  <Icon.MaterialCommunityIcons
    name={props.name}
    size={26}
    color={props.focused ? PRIMARY[100] : PRIMARY[200]}
  />
);

export const MaterialIcons = props => (
  <Icon.MaterialIcons
    name={props.name}
    size={26}
    color={props.focused ? PRIMARY[100] : PRIMARY[200]}
  />
);

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

MaterialIcons.propTypes = {
  name: PropTypes.string.isRequired,
};

MaterialCommunityIcons.propTypes = {
  name: PropTypes.string.isRequired,
};
export default TabBarIcon;
