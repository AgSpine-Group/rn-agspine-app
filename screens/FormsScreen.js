import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button, FlatList, View } from 'react-native';
import { submitFormDataAsync } from '../redux/actions/items';
import forms from '../forms';
import FormScreen from './FormScreen';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

import { StackActions, NavigationActions } from 'react-navigation';

const pushToForm = (item) => StackActions.push({
  routeName: 'Form', params: {
    formId: item.id
  }
});

const FormListComponent = (props) => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList data={props.forms} renderItem={({ item }) =>
        <Button
          onPress={() => {
            props.navigation.dispatch(pushToForm(item))
          }}
          style={styles.item}
          title={item.title}
        >
          {item.title}
        </Button>} />
    </View>)
}

class FormsScreen extends React.Component {
  static navigationOptions = {
    title: 'Forms',
  };

  updateItems = () => {
    return this.props.fetchItemsAsync(fakeItems)
  }
  render() {
    const { items, navigation } = this.props

    return (
      <ScrollView style={styles.container}>
        {forms.map((x, i) => (
          <FormListComponent navigation={navigation} title={x.title} forms={x.forms} key={x.title + i} />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = {
  submitFormDataAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(FormsScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    border: 1,
    backgroundColor: 'grey',
    border: 1
  },
  title: {
    fontSize: 22,
  }
});
