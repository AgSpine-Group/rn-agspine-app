const ChemForm = require('./chem_application_record/ChemForm')
const { chemFormData } = require('./chem_application_record/chem_application_record')

const formData = [{
  category: 'chem_application_forms',
  title: 'Chemical Application Forms',
  forms: [{
    id: '123456',
    title: 'Record Chemical Application',
    component: ChemForm,
    initialState: chemFormData
  }]
}];

export default formData;