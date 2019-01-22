const fetchItemsError = (error) => {
  return {
    type: 'FETCH_ITEMS_ERROR',
    error
  };
}
const fetchItemsSuccess = (data) => {
  console.log(data);
  return {
    type: 'FETCH_ITEMS_SUCCESS',
    data
  };
}

const fetchItemsRequest = () => {
  return {
    type: 'FETCH_ITEMS_REQUEST',
  };
}

export default fetchItemsAsync = (data) => async (dispatch) => {
  console.log(data);
  console.log('>>>>>>>>>>>>>>>>')
  dispatch(fetchItemsRequest())
  return fetchItemsSuccess(data)
}