import * as React from 'react';
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import { submitFormDataAsync, FORM_SUBMIT_REQUEST, FORM_SUBMIT_SUCCESS, FORM_SUBMIT_FAILURE } from '../../../redux/actions/form_submit';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let data = {
  'test': "part 1"
};

describe('App snapshot', () => {
  beforeEach(() => {
    fetchMock.restore()
  });

  it('Should call form submit request', async () => {
    fetchMock.getOnce('http://localhost:8000/form-submit', {
      body: {
        data: {
          id: '1234'
        }
      },
      headers: { 'content-type': 'application/json' }
    })

    const store = mockStore({ submittedForms: [] })


    await store.dispatch(submitFormDataAsync(data, '12345'));
    const actions = store.getActions();

    console.log('actions');
    console.log(actions);
    console.log('actions');
    expect(actions[0].type).toEqual(FORM_SUBMIT_REQUEST)
  });
  it('should return me the correct commit/rollBack metaData', async () => {
    fetchMock.getOnce('http://localhost:8000/form-submit', {
      body: {
        data: {
          id: '1234'
        }
      },
      headers: { 'content-type': 'application/json' }
    })

    const store = mockStore({ submittedForms: [] })


    await store.dispatch(submitFormDataAsync(data, '12345'));
    const actions = store.getActions();

    expect(actions[0].meta.offline.commit.type).toEqual(FORM_SUBMIT_SUCCESS);
    expect(actions[0].meta.offline.rollback.type).toEqual(FORM_SUBMIT_FAILURE);
  })
  it('should call the offline action', async () => {

    const newRecord = {
      id: 'newRecord'
    };
    const store = mockStore({ submittedForms: [{ id: 'testSubmition1' }] })

    await store.dispatch({
      type: FORM_SUBMIT_FAILURE,
      data: newRecord,
      syncId: '1234',
    })
    const actions = store.getActions();

    expect(actions[0].type).toEqual(FORM_SUBMIT_FAILURE);
  });
  it('should call the submit action', async () => {

    const newRecord = {
      id: 'newRecord'
    };
    const store = mockStore({ submittedForms: [{ id: 'testSubmition1' }] })

    await store.dispatch({
      type: FORM_SUBMIT_SUCCESS,
      data: newRecord,
      syncId: '1234',
    })
    const actions = store.getActions();

    expect(actions[0].type).toEqual(FORM_SUBMIT_SUCCESS);
  });
});
