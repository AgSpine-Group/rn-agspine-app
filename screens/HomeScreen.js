import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Container, Content } from 'native-base';
import { NavigationActions } from 'react-navigation';
import QuickNavButton from '../components/QuickNav/QuickNav';

const FRONT_SCREEN_HELPERS = [
  {
    title: 'Manage locations',
    location: 'LocationStack',
    icon: 'smile-circle',
  },
  {
    title: 'Submitted forms',
    location: 'SubmittedForms',
    icon: 'smile-circle',
  },
  {
    title: 'Calculators',
    location: 'CalculatorStack',
    icon: 'smile-circle',
  },
];
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
  navContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

const pushToPage = (page, navigation) => {
  return navigation.navigate('FormsStack', {}, NavigationActions.navigate({ routeName: page }));
};

const HomeScreen = props => {
  const { navigation } = props;
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.getStartedText}>
            Welcome to the ChemCert App! Click on forms to see all forms available.
          </Text>
          <View style={styles.navContainer}>
            <QuickNavButton
              navigation={navigation}
              pushToPage={pushToPage}
              navHelpers={FRONT_SCREEN_HELPERS}
            />
          </View>
        </ScrollView>
      </Content>
    </Container>
  );
};

export default HomeScreen;
