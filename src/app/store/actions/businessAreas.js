import api from './../../api';

const requestBusinessAreas = () => (
  {
    type: 'REQUEST_BUSINESS_AREAS',
  }
);

const receiveBusinessAreas = areas => (
  {
    type: 'RECEIVE_BUSINESS_AREAS',
    areas,
  }
);

const fetchBusinessAreas = () => (
  (dispatch) => {
    dispatch(requestBusinessAreas());

    return api.businessAreas.find({}).then((response) => {
      dispatch(receiveBusinessAreas(response.data));
      return response;
    }, (error) => {
      dispatch(receiveBusinessAreas([]));
      return error;
    });
  }
);

const resetBusinessAreasState = () => (
  {
    type: 'RESET_BUSINESS_AREAS',
  }
);

const resetBusinessAreas = () => (
  (dispatch) => {
    dispatch(resetBusinessAreasState());
  }
);

export default {
  fetchBusinessAreas,
  resetBusinessAreas,
};
