import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { StackActions } from 'react-navigation';
import ChemForm from './ChemForm';
import chemApplicationRecord from './chem_application_record';

const validationSchema = Yup.object().shape({
  property: Yup.object().shape({
    propertyId: Yup.string().required('Please select a property'),
  }),
  date: Yup.string().required('Please specify a date'),
  applicatorName: Yup.string().required('Please specify who applied the chemical'),
  paddock: Yup.object().shape({
    identification: Yup.object().shape({
      locationId: Yup.string().required('Please select a location for this property'),
    }),
  }),
});

const submitDataToFirebase = async ({ organisationId, values, formId }) => {
  const formDataByOrganisationRef = firebase.firestore().collection('submittedForms');

  const { currentUser } = firebase.auth();
  const dataBlob = {
    ...values,
    formId,
    organisationId,
    uid: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: null,
  };

  try {
    const batchWrite = firebase.firestore().batch();

    batchWrite.set(formDataByOrganisationRef.doc(), dataBlob);

    return batchWrite.commit();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const submitData = async ({ organisationId, values, formId, navigation }) => {
  await submitDataToFirebase({ organisationId, values, formId });

  const resetAction = StackActions.replace({
    routeName: 'SubmittedForms',
  });
  navigation.dispatch(resetAction);
};

// eslint-disable-next-line
export default class ChemicalApplicationForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={chemApplicationRecord}
        onSubmit={values =>
          submitData({
            organisationId: this.props.profile.organisationId,
            values,
            formId: this.props.formId,
            navigation: this.props.navigation,
          })
        }
        validationSchema={validationSchema}
        validateOnChange
      >
        {data => <ChemForm {...this.props} {...data} />}
      </Formik>
    );
  }
}

ChemicalApplicationForm.propTypes = {
  profile: PropTypes.shape({
    organisationId: PropTypes.string.isRequired,
  }).isRequired,
  formId: PropTypes.string.isRequired,
};
