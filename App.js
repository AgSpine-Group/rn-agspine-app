import './polyfills.js';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import NetworkWrapper from './components/NetworkWrapper';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import configStore from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import initializeDB from './db';
import * as firebase from 'firebase';
import LoginScreen from './screens/LoginScreen';

export const AuthenticationWrapper = ({ authed }) => {
  if (authed) {
    return <AppNavigator />
  }

  return <LoginScreen />
};



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isLoggedIn: false,
      persistor: {},
      store: {},
    };



    // Initialize Firebase
    if (!firebase.apps.length) {
      initializeDB()
    };
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={this.state.store}>
          <PersistGate persistor={this.state.persistor}>
            <NetworkWrapper dispatch={this.state.store.dispatch}>
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AuthenticationWrapper authed={this.state.isLoggedIn} />
              </View>
            </NetworkWrapper>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      this.setPersistedState(),
      this.checkAuth(),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }

  _handleLoadingError = error => {
    return;
  };

  _handleFinishLoading = () => {
    return this.setState({ isLoadingComplete: true });
  };

  setPersistedState = async () => {
    const { persistor, store } = configStore();
    return this.setState({
      persistor: persistor,
      store: store
    });
  }

  checkAuth = async () => {
    await firebase.auth().onAuthStateChanged(user => user && this.setState({
      isLoggedIn: true
    }));

    return;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
