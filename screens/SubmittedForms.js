import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button, FlatList, View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Right } from 'native-base';
import { StackActions } from 'react-navigation';

const pushToForm = (item) => StackActions.push({
  routeName: 'Form', params: {
    formId: item.id
  }
});

class SubmitedList extends React.Component {
  static navigationOptions = {
    title: 'Submitted forms',
  };

  render() {
    console.log(this.props.formData);
    return (
      <Container>
        <Content>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    formData: state.formData.data || {},
  };
}

export default connect(mapStateToProps, {})(SubmitedList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 22,
  }
});
