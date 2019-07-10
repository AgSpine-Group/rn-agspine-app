import * as React from 'react';
import firebase from 'firebase';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import Icon from '@expo/vector-icons';
import Font from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import NetworkWrapper from './components/NetworkWrapper';
import AppNavigator from './navigation/AppNavigator';
import configStore from './redux/store';
import initializeDB from './db';
import LoginScreen from './screens/LoginScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export const AuthenticationWrapper = ({ authed }) => {
  if (authed) {
    return <AppNavigator />;
  }

  return <LoginScreen />;
};

AuthenticationWrapper.propTypes = {
  authed: PropTypes.bool.isRequired,
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
      initializeDB();
    }
  }

  loadResourcesAsync = async () => {
    return Promise.all([
      this.setPersistedState(),
      this.checkAuth(),
      Font.loadAsync({
        ...Icon.Ionicons.font,

        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  handleLoadingError = error => error;

  handleFinishLoading = () => {
    return this.setState({ isLoadingComplete: true });
  };

  setPersistedState = async () => {
    const { persistor, store } = configStore();
    return this.setState({
      persistor,
      store,
    });
  };

  checkAuth = async () => {
    await firebase.auth().onAuthStateChanged(
      user =>
        user &&
        this.setState({
          isLoggedIn: true,
        })
    );
  };

  render() {
    const { isLoadingComplete, isLoggedIn, store, persistor } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NetworkWrapper dispatch={store.dispatch}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AuthenticationWrapper authed={isLoggedIn} />
            </View>
          </NetworkWrapper>
        </PersistGate>
      </Provider>
    );
  }
}
