import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';
import { fetchSubmittedFormsAsync } from '../redux/actions/submitted_forms';

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
    this.componentDidMount = async () => {
      await this.props.fetchSubmittedFormsAsync();
    };
    return (
      <Container>
        <Content>
          <List>
            {this.props.submittedFormData.map(data => (
              <ListItem key={data.id}>
                <Text>{data.payload.data.applicator_name}</Text>
                <Text>{data.payload.data.date}</Text>
                <Text>{data.payload.data.formId}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

SubmitedList.propTypes = {
  submittedFormData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      formId: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchSubmittedFormsAsync: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    submittedFormData: state.submittedFormData.data || [],
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  fetchSubmittedFormsAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitedList);
