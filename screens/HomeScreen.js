import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import QuickNavButton from '../components/QuickNav/QuickNav';
import { Text, Container, Header, Content } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

const FRONT_SCREEN_HELPERS = [
  {
    title: 'Submitted forms',
    location: 'SubmittedForms',
    icon: 'smile-circle',
  },
  {
    title: 'Calculators',
    location: 'SubmittedForms',
    icon: 'smile-circle',
  }
];

const pushToPage = (page, navigation) => {
  return navigation.navigate('FormsStack', {}, NavigationActions.navigate({ routeName: page }));
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container} >
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.welcomeContainer}>
              <Text style={styles.getStartedText}>Home</Text>
            </View>
            <Text style={styles.getStartedText}>
              Welcome to the ChemCert App! Click on forms to see all forms available.
            </Text>
            <QuickNavButton
              navigation={navigation}
              pushToPage={pushToPage}
              navHelpers={FRONT_SCREEN_HELPERS}
            />
          </ScrollView>
        </Content>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    // flexGrow: 1
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  helpContainer: {
    backgroundColor: '#f3f3f3',
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
