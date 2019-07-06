import React from 'react';
import { connect } from 'react-redux';
// import { StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
// import { StackActions } from 'react-navigation';

// const pushToForm = (item) => StackActions.push({
//   routeName: 'Form', params: {
//     formId: item.id
//   }
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//     backgroundColor: 'grey',
//   },
//   title: {
//     fontSize: 22,
//   },
// });

class SubmitedList extends React.Component {
  static navigationOptions = {
    title: 'Submitted forms',
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.props.formData.map(data => (
              <ListItem key={data.id}>
                <Text>{data.payload.data.applicator_name}</Text>
                <Text>{data.payload.data.date}</Text>
                <Text>{data.payload.data.property}</Text>
                <Text>{data.payload.data.formId}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.formData.data || [],
  };
};

export default connect(
  mapStateToProps,
  {}
)(SubmitedList);
