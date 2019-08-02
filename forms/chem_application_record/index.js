import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import ChemForm from './ChemForm';
import chemApplicationRecord from './chem_application_record';

const validationSchema = Yup.object().shape({
  location: Yup.object().shape({
    id: Yup.string().required('Please select a property'),
  }),
  date: Yup.string().required('Please specify a date'),
  applicatorName: Yup.string().required('Please specify who applied the chemical'),
  area: Yup.object().shape({
    identification: Yup.object().shape({
      id: Yup.string().required('Please which area on this property'),
    }),
  }),
});

const submitDataToFirebase = async ({ organisationId, values, formId, formName }) => {
  const formDataByOrganisationRef = firebase.firestore().collection('submittedForms');

  const { currentUser } = firebase.auth();
  const dataBlob = {
    ...values,
    formId,
    organisationId,
    uid: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: null,
    formName,
  };

  try {
    const batchWrite = firebase.firestore().batch();

    batchWrite.set(formDataByOrganisationRef.doc(), dataBlob);

    return batchWrite.commit();
  } catch (ex) {
    throw ex;
  }
};

const submitData = async ({ organisationId, values, formId, navigation, formName }) => {
  await submitDataToFirebase({ organisationId, values, formId, formName });

  navigation.popToTop();
  navigation.navigate({
    routeName: 'Locations',
    action: NavigationActions.navigate({
      routeName: 'Area',
      params: {
        areaId: values.area.identification.id,
      },
    }),
  });
};

const ChemicalApplicationForm = props => {
  const {
    formId,
    formName,
    navigation,
    profile: { organisationId },
  } = props;
  return (
    <Formik
      initialValues={chemApplicationRecord}
      onSubmit={values =>
        submitData({
          organisationId,
          values,
          formId,
          formName,
          navigation,
        })
      }
      validationSchema={validationSchema}
      validateOnChange
    >
      {data => <ChemForm {...props} {...data} />}
    </Formik>
  );
};

ChemicalApplicationForm.propTypes = {
  profile: PropTypes.shape({
    organisationId: PropTypes.string.isRequired,
  }).isRequired,
  formId: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
};

export default ChemicalApplicationForm;
