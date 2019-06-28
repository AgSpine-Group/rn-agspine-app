import './polyfills.js';
import React from 'react';
import { Platform, StatusBar, StyleSheet, NetInfo, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import configStore from './redux/store';
import connectionState from './redux/actions/connection';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import initializeDB from './db';
import * as firebase from 'firebase';
import LoginScreen from './screens/LoginScreen';



const Authenticated = () => {
  const user = firebase.auth().onAuthStateChanged((user) => user)
  if (user) {
    return (<AppNavigator />)
  }

  return (<LoginScreen />)
}
class NetworkWrapper extends React.PureComponent {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    this.props.dispatch(connectionState({ status: isConnected }));
  };

  render() {
    return (
      this.props.children
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };


    // Initialize Firebase
    if (!firebase.apps.length) {
      initializeDB()
    };
  }


  render() {
    const { persistor, store } = configStore();

    // Clears cached storage
    persistor.purge()

    // THIS IS BROKED
    // !this.props.skipLoadingScreen
    // if (!this.state.isLoadingComplete) {
    //   console.log('stuck here for some reason....')
    //   console.log(this.state.isLoadingComplete)
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
              <Authenticated />
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
