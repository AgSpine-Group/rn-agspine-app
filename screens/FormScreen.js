import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Title, Container, Button, Text } from 'native-base';
import _ from 'lodash';
import firebase from 'firebase';
import { StackActions } from 'react-navigation';
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

const submitDataToFirebase = async ({ organisationId, formData, formId }) => {
  const formDataByOrganisationRef = firebase.firestore().collection('submittedForms');

  // const formDataByLocation = firebase.firestore().collection('locationFormData');
  const { currentUser } = firebase.auth();
  const dataBlob = {
    ...formData,
    formId,
    organisationId,
    uid: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: null,
  };

  try {
    const batchWrite = firebase.firestore().batch();

    batchWrite.set(formDataByOrganisationRef.doc(), dataBlob);
    // batchWrite.set(formDataByLocation.doc(formData.paddock.identification.locationId), dataBlob);

    return batchWrite.commit();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

class FormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.formId = this.props.navigation.getParam('formId', null);
    this.form = forms.map(formTypes => formTypes.forms.find(x => x.id === this.formId));
    this.state = {
      formData: this.form[0].initialState,
    };
  }

  handleSubmit = async () => {
    const { formData } = this.state;
    const { organisationId } = this.props.profile;
    await submitDataToFirebase({ organisationId, formData, formId: this.formId });

    this.setState = {
      formData: this.form[0].initialState,
    };

    const resetAction = StackActions.replace({
      routeName: 'SubmittedForms',
    });
    this.props.navigation.dispatch(resetAction);
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
        <ChemForm
          onChange={this.handleFormChange}
          data={this.state.formData}
          profile={this.props.profile}
        />
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
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  submitFormDataAsync,
};

FormScreen.propTypes = {
  profile: PropTypes.shape({
    organisationId: PropTypes.string.isRequired,
  }).isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormScreen);
