import api from './../../api';

const requestMotoboys = () => (
  {
    type: 'REQUEST_MOTOBOYS',
  }
);

const receiveMotoboys = motoboys => (
  {
    type: 'RECEIVE_MOTOBOYS',
    motoboys,
  }
);

const fetchMotoboys = () => (
  (dispatch) => {
    dispatch(requestMotoboys());

    return api.motoboys.find({}).then((response) => {
      dispatch(receiveMotoboys(response.data));
      return response;
    }, (error) => {
      dispatch(receiveMotoboys([]));
      return error;
    });
  }
);

const resetMotoboysState = () => (
  {
    type: 'RESET_MOTOBOYS',
  }
);

const resetMotoboys = () => (
  (dispatch) => {
    dispatch(resetMotoboysState());
  }
);

export default {
  fetchMotoboys,
  resetMotoboys,
};
