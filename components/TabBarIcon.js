import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Icon from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { PRIMARY } from '../constants/Colors';

const styles = StyleSheet.create({
  activeIconContainer: {
    padding: 10,
    backgroundColor: '#A5E0A2',
    borderRadius: 4,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  nonActiveIconContainer: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
  },
  activeLabel: {
    color: '#289124',
  },
  notActiveLabel: {
    color: '#A5E0A2',
  },
});

export const TabBarIcon = props => (
  <Icon.Ionicons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);

export const MaterialCommunityIcons = props => (
  <View style={props.focused ? styles.activeIconContainer : styles.nonActiveIconContainer}>
    <Icon.MaterialCommunityIcons
      name={props.name}
      size={26}
      color={props.focused ? PRIMARY[500] : PRIMARY[200]}
    />
    {props.label && (
      <Text
        style={
          props.focused
            ? Object.assign({}, styles.label, styles.activeLabel)
            : Object.assign({}, styles.label, styles.notActiveLabel)
        }
      >
        {props.label}
      </Text>
    )}
  </View>
);

export const MaterialIcons = props => (
  <View style={props.focused ? styles.activeIconContainer : styles.nonActiveIconContainer}>
    <Icon.MaterialIcons
      name={props.name}
      size={26}
      color={props.focused ? PRIMARY[500] : PRIMARY[200]}
    />
    {props.label && (
      <Text
        style={
          props.focused
            ? Object.assign({}, styles.label, styles.activeLabel)
            : Object.assign({}, styles.label, styles.notActiveLabel)
        }
      >
        {props.label}
      </Text>
    )}
  </View>
);

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};
export default TabBarIcon;
