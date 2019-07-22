import chemFormData from './chem_application_record/chem_application_record';
// import ChemForm from './chem_application_record/ChemForm';
import ChemForm from './chem_application_record';

const formData = [
  {
    id: '123456',
    category: 'chem_application_forms',
    title: 'Chemical Application Forms',
    description: 'Some kind of description',
    forms: [
      {
        id: '123456',
        title: 'Record Chemical Application',
        Component: ChemForm,
        initialState: chemFormData,
        description:
          'Record what you have sprayed and where to keep track of how you are managing your fields',
      },
    ],
  },
  {
    id: '123456',
    category: 'chem_application_forms',
    title: 'Chemical Application Forms',
    description: 'Some kind of description',
    forms: [
      {
        id: '123456',
        title: 'Record Chemical Application',
        Component: ChemForm,
        initialState: chemFormData,
        description:
          'Record what you have sprayed and where to keep track of how you are managing your fields',
      },
    ],
  },
  {
    id: '123456',
    category: 'chem_application_forms',
    title: 'Chemical Application Forms',
    description: 'Some kind of description',
    forms: [
      {
        id: '123456',
        title: 'Record Chemical Application',
        Component: ChemForm,
        initialState: chemFormData,
        description:
          'Record what you have sprayed and where to keep track of how you are managing your fields',
      },
    ],
  },
];

export default formData;
