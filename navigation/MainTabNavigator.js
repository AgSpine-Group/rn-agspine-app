import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/AntDesign';
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
  // eslint-disable-next-line
  <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
    <Image
      style={{ marginLeft: 15, width: 24, height: 24, backgroundColor: '#add8e6' }}
      // eslint-disable-next-line
      source={require('./../assets/images/icon_hamburger.png')}
    />
  </TouchableOpacity>
);

export { MainNavigator };
