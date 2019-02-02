import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, FlatList, View, StyleSheet } from 'react-native';
import { Title, Container, Button } from 'native-base';
import { submitFormDataAsync } from '../redux/actions/items';
import ChemForm from '../forms/chem_application_record/ChemForm';
import forms from '../forms';

class FormScreen extends React.Component {
  constructor(props) {
    super(props)
    this.formId = this.props.navigation.getParam('formId', null);
    this.form = forms.map(formTypes => formTypes.forms.find(x => x.id === this.formId));
    this.state = {
      formData: this.form[0].initialState
    }
  }
  handleSubmit() {
    const formData = this.state.formData;

    return this.props.submitFormDataAsync(formData, this.formId);
  }

  handleFormChange = (key) => (value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: value
      }
    })
  }

  render() {
    const header = 'Chemical Application';

    console.log(this.props);

    console.log('>>>>>>>>');
    return (
      <Container style={styles.formContainer}>
        <Title style={styles.formHeader}>{header}</Title>
        <ChemForm onChange={this.handleFormChange} data={this.state.formData} />
        <Button primary full onPress={this.handleSubmit.bind(this)}><Text> Create </Text></Button>
      </Container >
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    formData: state.formData,
  };
};

const mapDispatchToProps = {
  submitFormDataAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    display: 'flex',
  },
  formHeader: {
    alignSelf: 'center',
  }
});



