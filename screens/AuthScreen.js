import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { getAndPersistProfileAsync } from '../redux/actions/profile';

const AuthLoading = class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  handleFinishLoading = async () => {
    await this.setPersistedProfile();
  };

  setPersistedProfile = async () => {
    return this.props.getAndPersistProfileAsync();
  };

  checkAuth = async () => {
    await firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.setPersistedProfile();
        return this.props.navigation.navigate('Main');
      }
      return this.props.navigation.navigate('Signin');
    });
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
};

AuthLoading.propTypes = {
  getAndPersistProfileAsync: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getAndPersistProfileAsync,
};

export default connect(
  null,
  mapDispatchToProps
)(AuthLoading);
