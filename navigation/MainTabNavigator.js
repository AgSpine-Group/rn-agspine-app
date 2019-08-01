import React from 'react';
import firebase from 'firebase';
import {
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons, MaterialIcons } from '../components/TabBarIcon';
import { PRIMARY } from '../constants/Colors';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import FormsScreen from '../screens/FormListScreen';
import AuthLoadingScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import CalculatorListScreen from '../screens/CalculatorListScreen';
import LocationListScreen from '../screens/LocationListScreen';
import AreaScreen from '../screens/AreaScreen';
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

const backHeader = navigation => ({
  headerTintColor: PRIMARY[100],
  headerStyle: {
    backgroundColor: PRIMARY[400],
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: SubmittedForms,
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
  Area: {
    screen: AreaScreen,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return backHeader(navigation);
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
      navigationOptions: ({ navigation }) => {
        const { index } = navigation.state;
        return {
          tabBarLabel: 'Forms',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons focused={focused} name="clipboard-text" label="Forms" />
          ),
          tabBarVisible: index !== 1,
        };
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
const MainNavigator = createDrawerNavigator(
  {
    main: {
      screen: HomeStackNavigator,
      navigationOptions: TabNavigationOptions,
    },
    setting: {
      screen: SettingsStackNavigator,
      navigationOptions: SettingsNavigationOptions,
    },
  },
  {
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ horizontal: 'never' }}>
          <DrawerItems {...props} />
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              paddingTop: 13,
              paddingBottom: 13,
            }}
          >
            <TouchableHighlight onPress={() => firebase.auth().signOut()}>
              <React.Fragment>
                <Icon
                  name="setting"
                  size={25}
                  color="black"
                  style={{ paddingLeft: 16 }}
                  {...props}
                />
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    marginLeft: 32,
                    fontWeight: 'bold',
                  }}
                >
                  Signout
                </Text>
              </React.Fragment>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

export const DrawerIcon = props => (
  <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
    <Image
      style={{ marginLeft: 15, width: 24, height: 24, backgroundColor: PRIMARY[400] }}
      source={require('./../assets/images/icon_hamburger.png')}
    />
  </TouchableOpacity>
);

const LoadingNavigator = createStackNavigator({
  AuthLoading: AuthLoadingScreen,
});

const AuthNavigator = createStackNavigator({ SignIn: LoginScreen });

export { MainNavigator, LoadingNavigator, AuthNavigator };
