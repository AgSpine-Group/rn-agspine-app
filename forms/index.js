import chemFormData from './chem_application_record/chem_application_record';
// import ChemForm from './chem_application_record/ChemForm';
import ChemForm from './chem_application_record';

const formData = [
  {
    category: 'chem_application_forms',
    title: 'Chemical Application Forms',
    forms: [
      {
        id: '123456',
        title: 'Record Chemical Application',
        component: ChemForm,
        initialState: chemFormData,
        description:
          'Record what you have sprayed and where to keep track of how you are managing your fields',
      },
    ],
  },
];

export default formData;
