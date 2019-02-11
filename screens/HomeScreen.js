import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import QuickNavButton from '../components/QuickNav/QuickNav';
import { Text, Container, Header, Content } from 'native-base';

const FRONT_SCREEN_HELPERS = [{
  title: 'All forms',
  location: 'See all forms',
  icon: '',
},
{
  title: 'Submitted forms',
  location: 'PUSH HERE',
  icon: '',
}]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container style={styles.container} >
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.getStartedText}>Home</Text>
            </View>
            <Text style={styles.getStartedText}>
              Welcome to the ChemCert App! Click on forms to see all forms available.
            </Text>

            <QuickNavButton />
            {/* <View style={styles.helpContainer}> */}
            {/* <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
              </TouchableOpacity> */}
            {/* </View> */}
          </ScrollView>
        </Content>
      </Container >
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
