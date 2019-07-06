import React from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  Input,
  Container,
  Header,
  Content,
  Form,
  Item as FormItem,
  Label,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'center',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 25,
    color: colors.SECONDARY_COLOR,
    fontWeight: 'bold',
  },
  innerContainer: {
    height: 300,
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
  },
  inputContainer: {
    height: 50,
    padding: 10,
  },
  formWrapper: {
    paddingBottom: 30,
    alignContent: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
});

const fixedContainer = {
  flexDirection: 'row',
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
  }

  handleChange = tag => value => {
    this.setState({ [tag]: value });
  };

  handleSignup = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => console.log(res));
    } catch (ex) {
      console.log(ex);
      alert(ex);
    }
  };

  handleLogin = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => console.log(res));
    } catch (ex) {
      console.log(ex);
      alert(ex);
    }
  };

  handleLogout = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(res => console.log(res));
    } catch (ex) {
      console.log(ex);
      alert(ex);
    }
  };

  render() {
    return (
      <Container>
        <Header center="Hi there" />
        <Content style={styles.yellow} contentContainerStyle={fixedContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.heading}>Login here</Text>
            <View style={styles.container}>
              <Form style={styles.formWrapper}>
                <FormItem floatingLabel>
                  <Label>Email</Label>
                  <Input
                    tag="email"
                    type="email"
                    onChangeText={this.handleChange('email')}
                    value={this.state.email}
                    textContentType="emailAddress"
                  />
                </FormItem>
                <FormItem floatingLabel>
                  <Label>Password</Label>
                  <Input
                    tag="password"
                    type="password"
                    onChangeText={this.handleChange('password')}
                    value={this.state.password}
                    textContentType="password"
                    secureTextEntry
                  />
                </FormItem>
              </Form>
              <PrimaryButton onPress={this.handleLogin} full primary style={{ marginTop: 35 }}>
                <Text>Login</Text>
              </PrimaryButton>

              <SecondaryButton
                onPress={this.handleSignup}
                secureTextEntry
                full
                light
                primary
                style={{ marginTop: 35 }}
              >
                <Text>Sign up</Text>
              </SecondaryButton>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
