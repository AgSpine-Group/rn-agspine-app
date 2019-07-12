import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { MaterialCommunityIcons, TabBarIcon, MaterialIcons } from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FormsScreen from '../screens/FormsScreen';
import FormScreen from '../screens/FormScreen';
import SubmittedForms from '../screens/SubmittedForms';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const DashboardStack = createStackNavigator({
  Home: HomeScreen,
});

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => <MaterialIcons focused={focused} name="dashboard" label="Dashboard" />,
};

const PaddockStack = createStackNavigator({
  Home: HomeScreen,
});

PaddockStack.navigationOptions = {
  tabBarLabel: 'Paddocks',
  tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="leaf" label="Paddocks" />,
};

const CalculatorStack = createStackNavigator({
  Home: HomeScreen,
});

CalculatorStack.navigationOptions = {
  tabBarLabel: 'Calculators',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      focused={focused}
      name="calculator-variant"
      label="Calculators"
    />
  ),
};

const FormsStack = createStackNavigator({
  Forms: FormsScreen,
  Form: FormScreen,
  SubmittedForms,
});

FormsStack.navigationOptions = {
  tabBarLabel: 'Forms',
  tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="clipboard-text" label="Forms" />,
};

const BottomTabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#289124', // 500
    inactiveTintColor: '#A5E0A2', // 200
    style: {
      backgroundColor: '#34AD2F', // 400
    },
  },
};

FormsStack.propTypes = {
  focused: PropTypes.bool.isRequired,
};

export default createBottomTabNavigator(
  {
    DashboardStack,
    PaddockStack,
    CalculatorStack,
    FormsStack,
  },
  BottomTabNavigatorConfig
);
