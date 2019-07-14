import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons, MaterialIcons } from '../components/TabBarIcon';
import { PRIMARY } from '../constants/Colors';

import SettingsScreen from '../screens/SettingsScreen';
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

const BottomTabNavigatorConfig = {
  navigationOptions: () => {
    return {
      header: null,
    };
  },
  tabBarOptions: {
    activeTintColor: PRIMARY[100],
    inactiveTintColor: PRIMARY[200],
    style: {
      backgroundColor: PRIMARY[400],
    },
  },
};

const topHeaderStyles = navigation => ({
  headerLeft: <DrawerIcon navigation={navigation} />,
  headerStyle: {
    backgroundColor: PRIMARY[400],
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return topHeaderStyles(navigation);
    },
  },

  // ....Add more screens for each stack here
});

const FormStack = createStackNavigator({
  Forms: {
    screen: FormsScreen,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return topHeaderStyles(navigation);
    },
  },
  FormScreen: {
    screen: FormScreen,
  },
  SubmittedForms: {
    screen: SubmittedForms,
  },
  // ....Add more screens for each stack here
});
const LocationStack = createStackNavigator({
  Locations: {
    screen: LocationListScreen,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return topHeaderStyles(navigation);
    },
  },
  // ....Add more screens for each stack here
});

const CalculatorStack = createStackNavigator({
  Calculators: {
    screen: CalculatorListScreen,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return topHeaderStyles(navigation);
    },
  },
  // ....Add more screens for each stack here
});

// BOTTOM NAVIGATOR
const MainTabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ focused }) => (
          <MaterialIcons focused={focused} name="dashboard" label="Dashboard" />
        ),
      },
    },
    Locations: {
      screen: LocationStack,
      navigationOptions: {
        tabBarLabel: 'Locations',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons focused={focused} name="leaf" label="Locations" />
        ),
      },
    },
    Calculators: {
      screen: CalculatorStack,
      navigationOptions: {
        tabBarLabel: 'Calculators',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons focused={focused} name="calculator-variant" label="Calculators" />
        ),
      },
    },
    Forms: {
      screen: FormStack,
      navigationOptions: {
        tabBarLabel: 'Forms',
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons focused={focused} name="clipboard-text" label="Forms" />
        ),
      },
    },
  },
  BottomTabNavigatorConfig
);

const HomeStackNavigator = createStackNavigator({
  HomeTabNavigator: MainTabNavigator,
});

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
  drawerIcon: <Icon name="home" size={25} color="black" {...props} />,
});

const SettingsNavigationOptions = props => ({
  title: 'Settings',
  drawerIcon: <Icon name="setting" size={25} color="black" {...props} />,
});

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
      style={{ marginLeft: 15, width: 24, height: 24, backgroundColor: PRIMARY[400] }}
      source={require('./../assets/images/icon_hamburger.png')}
    />
  </TouchableOpacity>
);

export { MainNavigator };
