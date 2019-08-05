import React from 'react';
import { Clipboard, TouchableHighlight, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Input, Button, List, ListItem, Item, Picker, Icon } from 'native-base';
import { GREY, PRIMARY } from '../../constants/Colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  drawerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  calculatorScreen: {
    height: height * 0.3,
    backgroundColor: '#fff',
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  calculatorContainer: {
    padding: 10,
    display: 'flex',
    width: '100%',
  },
  calculatedValue: {
    color: GREY[800],
    fontSize: 36,
  },
  calculatorList: {
    backgroundColor: '#fff',
  },
  calculatorListItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    flex: 1,
  },
  inputContainer: {
    flex: 2,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: PRIMARY[300],
    marginBottom: 8,
  },
  clickedContainer: {
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  outlineButton: {
    backgroundColor: 'transparent',
  },
  outlineButtonContainer: {
    borderColor: PRIMARY[400],
    borderWidth: 1,
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
  },
  copiedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
  },
});

class CalculatorDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clipboardClicked: false,
      calculatedValue: '1337',
      isCopied: false,
    };
  }

  onPress = async () => {
    await Clipboard.setString(this.state.calculatedValue);
    const clipboardVal = await Clipboard.getString();

    this.setState(prevState => {
      const isCopied = prevState.calculatedValue === clipboardVal;
      return {
        isCopied,
      };
    });
  };

  onHideUnderlay = () => {
    this.setState({ clipboardClicked: false });
  };

  onShowUnderlay = () => {
    this.setState({ clipboardClicked: true });
  };

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.calculatorScreen}>
          <View style={styles.contentContainer}>
            <Text style={styles.calculatedValue}>1337</Text>
          </View>
        </View>
        <View style={styles.calculatorContainer}>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select a calculator"
              placeholderStyle={{
                color: '#bfc6ea',
                backgroundColor: '#fff',
              }}
              placeholderIconColor="#007aff"
            >
              <Picker.Item label="Corn calculator" value="key0" />
              <Picker.Item label="Banana calculator" value="key1" />
              <Picker.Item label="Raddish calculator" value="key2" />
              <Picker.Item label="Eggplant calculator" value="key3" />
              <Picker.Item label="Turnip calculator" value="key4" />
            </Picker>
          </Item>

          <View style={styles.calculatorList}>
            <List>
              <ListItem>
                <View style={styles.calculatorListItem}>
                  <Text style={styles.label}>Area size</Text>
                  <View style={styles.inputContainer}>
                    <Input placeholder="Area size" />
                  </View>
                </View>
              </ListItem>
              <ListItem>
                <View style={styles.calculatorListItem}>
                  <Text style={styles.label}>Liquid Concentration</Text>
                  <View style={styles.inputContainer}>
                    <Input placeholder="Liquid Concentration" />
                  </View>
                </View>
              </ListItem>
              <ListItem>
                <View style={styles.calculatorListItem}>
                  <Text style={styles.label}>Temperature</Text>
                  <View style={styles.inputContainer}>
                    <Input placeholder="Temperature" />
                  </View>
                </View>
              </ListItem>
            </List>
          </View>

          <View style={styles.buttonContainer}>
            <Button block style={styles.addButton}>
              <Text style={{ color: PRIMARY[500] }}>Calculate</Text>
            </Button>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={PRIMARY[300]}
              onPress={this.onPress}
              style={
                this.state.clipboardClicked
                  ? styles.clickedContainer
                  : styles.outlineButtonContainer
              }
              onHideUnderlay={this.onHideUnderlay}
              onShowUnderlay={this.onShowUnderlay}
            >
              <View style={styles.copiedContainer}>
                <Text style={{ color: PRIMARY[500], textAlign: 'center' }}>
                  {this.state.isCopied ? '' : 'Copy to clipboard'}
                </Text>
                {this.state.isCopied && (
                  <Icon
                    style={{ marginLeft: 8, color: PRIMARY[400] }}
                    type="AntDesign"
                    name="checkcircle"
                  />
                )}
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

export default CalculatorDrawer;
