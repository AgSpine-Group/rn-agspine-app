export default {
  login: {
    id: '',
    name: 'magic'
  },
  items: {
    loading: false,
    error: null,
    data: [],
    meta: {},
    links: [],
  },
  formData: {
    loading: false,
    error: false,
    data: [],
    meta: {
      totalAvailable: 0
    }
  },
  submittedForms: {
    loading: false,
    error: false,
    data: {},
    meta: {
      totalSubmitted: 0,
      totalUploaded: 0,
    }
  }
}