import React from 'react';
import firebase from 'firebase';
import {
  View,
  Text,
  Input,
  Container,
  Header,
  Content,
  Card,
  Icon,
  Button,
  Form,
  Item,
  Label,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import colors from '../constants/Colors';
import { PRIMARY, GREY } from '../constants/Colors';

import { ImageBackground } from 'react-native'

import { Dimensions, Animated, Switch } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

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

const loginStyles = {
  background: {
    backgroundColor: 'red',
    position: 'relative'
  },
  card: {
    padding: 10,
    height: height * 0.8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    width: width,
    position: 'absolute',
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'column'
  },
  primaryButton: {
    marginTop: 40,
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: PRIMARY[400]
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  outlineButton: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderColor: PRIMARY[800],
    borderRadius: 1
  },
  outlineButtonText: {
    color: PRIMARY[600],
    fontWeight: 'bold',
    fontSize: 16
  },
  inactiveIcon: {
    color: PRIMARY[200]
  },
  inactiveInputText: {
    color: GREY[600]
  },
  forgotPasswordContainer: {
    display: 'flex',
    marginTop: 20,
    alignItems: 'flex-end',
    width: '100%'
  },
  forgotPasswordText: {
    color: PRIMARY[400],
    fontSize: 14
  },
  spacer: {
    margin: 40,
  },
  toggle: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    inactiveText: {
      margin: 10,
      fontSize: 12,
      color: GREY[600]
    },
    activeText: {
      fontSize: 12,
      margin: 10,
      color: PRIMARY[800]
    }
  },
  frontScreen: {
    container: {
      display: 'flex',
      height,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    body: {
      container: {
        width: width * 0.8,
        padding: 20,
      },
      text: {
        color: '#fff',
        textAlign: 'center'
      }
    },
    title: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 36
    },
    buttonContainer: {
      display: 'flex',
      width: width * 0.8,
    },
    registerButton: {
      backgroundColor: '#fff',
    },
    registerText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: PRIMARY[800]
    },
    loginButton: {
      marginTop: 10,
      backgroundColor: PRIMARY[400],
    },
    loginText: {
      fontWeight: 'bold',
      fontSize: 16
    }
  },
}

function applyLetterSpacing(string, count = 1) {
  return string.split('').join('\u200A'.repeat(count));
}

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      showForm: false,
      type: '',
      bottom: new Animated.Value(-1000),
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

  showForm = type => () => {
    this.setState({
      showForm: true,
      type
    })
    Animated.timing(this.state.bottom, {
      toValue: 0,
      duration: 500
    }).start();
  }

  toggle = () => {
    const currentValue = this.state.type;

    const oppositeValue = currentValue === 'sign-up' ? 'log-in' : 'sign-up';

    this.setState({
      type: oppositeValue
    })
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/background-2.jpg')}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        {
          !this.state.showForm && (
            <View style={loginStyles.frontScreen.container}>
              <View style={loginStyles.frontScreen.textContainer}>
                <Text style={loginStyles.frontScreen.title}>{
                  applyLetterSpacing('AGSPINE')
                }</Text>
                <View style={loginStyles.frontScreen.body.container}>
                  <Text style={loginStyles.frontScreen.body.text}>Digitalise and streamline your agriculture business</Text>
                </View>
              </View>
              <View style={loginStyles.frontScreen.buttonContainer}>
                <Button style={loginStyles.frontScreen.registerButton} full onPress={this.showForm('sign-up')}>
                  <Text style={loginStyles.frontScreen.registerText}>Sign Up</Text>
                </Button>
                <Button style={loginStyles.frontScreen.loginButton} full onPress={this.showForm('log-in')}>
                  <Text style={loginStyles.frontScreen.loginText}>Log In</Text>
                </Button>
              </View>
            </View>
          )
        }
        <Animated.View style={Object.assign({
          bottom: this.state.bottom
        }, loginStyles.card)}>
          <View style={loginStyles.horizontal}>
            <View style={loginStyles.toggle.container}>
              <Text style={this.state.type === 'sign-up' ? loginStyles.toggle.activeText : loginStyles.toggle.inactiveText}>Sign Up</Text>
              <Switch
                onChange={this.toggle}
                onValueChange={this.toggle}
                value={this.state.type === 'log-in'}
              />
              <Text style={this.state.type === 'log-in' ? loginStyles.toggle.activeText : loginStyles.toggle.inactiveText}>Log In</Text>
            </View>
            <Form>
              <Item floatingLabel>
                <Label style={loginStyles.inactiveInputText}>Email</Label>
                <Icon name='email' type='MaterialIcons' style={loginStyles.inactiveIcon} />
                <Input
                  tag="email"
                  type="email"
                  onChangeText={this.handleChange('email')}
                  value={this.state.email}
                  textContentType="emailAddress"
                />
              </Item>
              <Item floatingLabel>
                <Label style={loginStyles.inactiveInputText}>Password</Label>
                <Icon name='eye' type='Entypo' style={loginStyles.inactiveIcon} />
                <Input
                  tag="password"
                  type="password"
                  onChangeText={this.handleChange('password')}
                  value={this.state.password}
                  textContentType="password"
                  secureTextEntry
                />
              </Item>
              <View style={loginStyles.forgotPasswordContainer}>
                <Text style={loginStyles.forgotPasswordText}>Forgot your password?</Text>
              </View>
              <Button style={loginStyles.primaryButton} full onPress={this.state.type === 'sign-up' ? this.handleSignup : this.handleLogin}>
                <Text style={loginStyles.primaryText}>{this.state.type === 'sign-up' ? 'Sign' : 'Log'} In</Text>
              </Button>
              <Button iconLeft bordered style={loginStyles.outlineButton} full>
                <Icon name='google' type='AntDesign' style={loginStyles.outlineButtonText} />
                <Text style={loginStyles.outlineButtonText}>{this.state.type === 'sign-up' ? 'Sign' : 'Log'} In With google</Text>
              </Button>
            </Form>
          </View>
        </Animated.View>
      </ImageBackground >
    );
  }
}