import * as React from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { Dimensions, Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Icon from '@expo/vector-icons';
import Font from 'expo-font';

import { DrawerLayout } from 'react-native-gesture-handler';

import { PersistGate } from 'redux-persist/integration/react';

import { SafeAreaView } from 'react-navigation';
import NetworkWrapper from './components/NetworkWrapper';
import CalculatorDrawer from './components/CalculatorDrawer';
import { GREY } from './constants/Colors';

import AppNavigator from './navigation/AppNavigator';
import configStore from './redux/store';
import fbInitialize from './firebase';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      persistor: {},
      store: {},
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      fbInitialize();
    }
  }

  handleFinishLoading = async () => {
    return this.setState({ isLoadingComplete: true });
  };

  loadResourcesAsync = async () => {
    return Promise.all([
      this.setPersistedState(),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  handleLoadingError = error => error;

  setPersistedState = async () => {
    const { persistor, store } = configStore();

    return this.setState({
      persistor,
      store,
    });
  };

  renderDrawer = () => {
    return <CalculatorDrawer />;
  };

  render() {
    const { isLoadingComplete, store, persistor } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    // Cleans out data from the persisted redux
    // Need to decide what reducers to whitelist for offline behaviour
    this.state.persistor.purge();
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NetworkWrapper dispatch={store.dispatch}>
            <SafeAreaView style={styles.container}>
              <DrawerLayout
                ref={drawer => {
                  this.drawer = drawer;
                }}
                drawerWidth={width * 0.95}
                drawerPosition={DrawerLayout.positions.Right}
                drawerType="front"
                hideStatusBar
                drawerBackgroundColor={GREY[300]}
                renderNavigationView={this.renderDrawer}
              >
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator
                  screenProps={{
                    openDrawer: () => this.drawer.openDrawer(),
                  }}
                />
              </DrawerLayout>
            </SafeAreaView>
          </NetworkWrapper>
        </PersistGate>
      </Provider>
    );
  }
}
