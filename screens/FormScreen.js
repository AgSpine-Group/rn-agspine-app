import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Title, Container, Button, Text } from 'native-base';
import _ from 'lodash';
import { submitFormDataAsync } from '../redux/actions/form_submit';
import ChemForm from '../forms/chem_application_record/ChemForm';
import forms from '../forms';

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    display: 'flex',
  },
  formHeader: {
    alignSelf: 'center',
  },
});

class FormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.formId = this.props.navigation.getParam('formId', null);
    console.log(this.formId);
    this.form = forms.map(formTypes => formTypes.forms.find(x => x.id === this.formId));
    console.log(this.form);
    this.state = {
      formData: this.form[0].initialState,
    };
  }

  handleSubmit = () => {
    const { formData } = this.state;
    this.props.submitFormDataAsync(formData, this.formId);
    this.setState = {
      formData: this.form[0].initialState,
    };
  };

  handleFormChange = key => value => {
    const current = this.state.formData;
    const updated = _.set(current, `${key}`, value);
    this.setState({
      formData: updated,
    });
  };

  render() {
    const header = 'Chemical Application';
    return (
      <Container style={styles.formContainer}>
        <Title style={styles.formHeader}>{header}</Title>
        <ChemForm onChange={this.handleFormChange} data={this.state.formData} />
        <Button primary full onPress={this.handleSubmit}>
          <Text>Create</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: state.formData,
  };
};

const mapDispatchToProps = {
  submitFormDataAsync,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormScreen);
