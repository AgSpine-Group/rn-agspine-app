import React from 'react';
<<<<<<< HEAD
import { TouchableOpacity, Image } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/AntDesign';
import SettingsScreen from '../screens/SettingsScreen';
=======
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { MaterialCommunityIcons, TabBarIcon, MaterialIcons } from '../components/TabBarIcon';
>>>>>>> commit
import HomeScreen from '../screens/HomeScreen';
import FormsScreen from '../screens/FormListScreen';
import CalculatorListScreen from '../screens/CalculatorListScreen';
import LocationListScreen from '../screens/LocationListScreen';
import FormScreen from '../screens/FormScreen';
import SubmittedForms from '../screens/SubmittedForms';

// - AppSwitchNavigator
// TODO move the auth section to the login/signup page
//    - WelcomeScreen
//      - Login Button
//      - Sign Up Button
//    - AppDrawerNavigator
//          - Home - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
//            - DashboardTabNavigator
//              - Tab 1 - Home
//              - Tab 2 - Forms
//              - Tab 3 - Locations
//            - Any files you don't want to be a part of the Tab Navigator can go here.
//          - Settings - DashboardStackSettings

// BOTTOM NAVIGATOR
const MainTabNavigator = createBottomTabNavigator(
  {
    Dashboard: HomeScreen,
    Locations: LocationListScreen,
    Calculators: CalculatorListScreen,
    Forms: FormsScreen,
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: MainTabNavigator,
    Form: FormScreen,
    SubmittedForms,
  },
  {
    defaultNavigationOptions: props => ({
      headerLeft: <DrawerIcon {...props} />,
    }),
  }
);
const SettingsStackNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: props => ({
      headerLeft: <DrawerIcon {...props} />,
      headerTitle: 'Settings',
    }),
  }
);

// DRAWER COMPONENTS
const TabNavigationOptions = props => ({
  title: 'Home',
  drawerIcon: <Icon name="home" size="25" color="black" {...props} />,
});

const SettingsNavigationOptions = props => ({
  title: 'Settings',
  drawerIcon: <Icon name="setting" size="25" color="black" {...props} />,
});

<<<<<<< HEAD
// DRAWER
const MainNavigator = createDrawerNavigator({
  main: {
    screen: HomeStackNavigator,
    navigationOptions: TabNavigationOptions,
  },
  setting: {
    screen: SettingsStackNavigator,
    navigationOptions: SettingsNavigationOptions,
  },
});

export const DrawerIcon = props => (
  <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
    <Image
      style={{ marginLeft: 15, width: 24, height: 24, backgroundColor: '#add8e6' }}
      source={require('./../assets/images/icon_hamburger.png')}
=======
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
>>>>>>> commit
    />
  </TouchableOpacity>
);

<<<<<<< HEAD
export { MainNavigator };
=======
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
>>>>>>> commit
