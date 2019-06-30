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
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      initializeDB()
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoadingComplete: true,
          isLoggedIn: true,
        })
      }
    });
  }
  render() {
    const { persistor, store } = configStore();

    // Clears cached storage
    persistor.purge();
    // firebase.auth().signOut();

    // THIS IS BROKED
    // if (!this.state.isLoadingComplete) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadResourcesAsync}
    //       onError={this._handleLoadingError}
    //       onFinish={this._handleFinishLoading}
    //     />
    //   );
    // }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NetworkWrapper dispatch={store.dispatch}>
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
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

_handleLoadingError = error => {
  console.warn(error);
};

_handleFinishLoading = () => {
  this.setState({ isLoadingComplete: true });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
