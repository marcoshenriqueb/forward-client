import api from './../../api';
import store from './../../store';

const requestBusiness = () => (
  {
    type: 'REQUEST_BUSINESS',
  }
);

const receiveBusiness = business => (
  {
    type: 'RECEIVE_BUSINESS',
    business,
  }
);

const fetchBusiness = () => (
  (dispatch) => {
    dispatch(requestBusiness());

    return api.businesses.find({
      query: {
        _id: store.getState().auth.user.data.business,
      },
    }).then((response) => {
      dispatch(receiveBusiness(response.data));
      return response;
    }, (error) => {
      dispatch(receiveBusiness(null));
      return error;
    });
  }
);

const resetBusinessState = () => (
  {
    type: 'RESET_BUSINESS',
  }
);

const resetBusiness = () => (
  (dispatch) => {
    dispatch(resetBusinessState());
  }
);

export default {
  fetchBusiness,
  resetBusiness,
};
