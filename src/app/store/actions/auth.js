import api from './../../api';
import business from './business';
import businessAreas from './businessAreas';

const requestToken = () => (
  {
    type: 'REQUEST_TOKEN',
  }
);

const receiveToken = (token, auth) => (
  {
    type: 'RECEIVE_TOKEN',
    token,
    auth,
  }
);

const requestUser = () => (
  {
    type: 'REQUEST_USER',
  }
);

const receiveUser = user => (
  {
    type: 'RECEIVE_USER',
    user,
  }
);

const resetUser = () => (
  {
    type: 'RESET_USER',
  }
);

const fetchUser = () => (
  (dispatch) => {
    dispatch(requestUser());

    return api.users.find({})
      .then((response) => {
        dispatch(receiveUser(response.data[0]));
        return response;
      }, (error) => {
        dispatch(receiveUser({}));
        return error;
      });
  }
);

const fetchGeneralBusinessResources = dispatch => (
  Promise.all([
    fetchUser()(dispatch),
    business.fetchBusiness()(dispatch),
    businessAreas.fetchBusinessAreas()(dispatch),
  ])
);

const checkToken = token => (
  (dispatch) => {
    dispatch(requestToken());

    return api.auth({
      strategy: 'jwt',
      accessToken: token,
    }).then((response) => {
      dispatch(receiveToken(response.accessToken, true));
      fetchGeneralBusinessResources(dispatch);
      return response;
    }, (error) => {
      dispatch(receiveToken('', false));
      return error;
    });
  }
);

const login = credentials => (
  (dispatch) => {
    dispatch(requestToken());

    return api.auth({
      strategy: 'local',
      ...credentials,
    }).then((response) => {
      dispatch(receiveToken(response.accessToken, true));
      fetchGeneralBusinessResources(dispatch);
      return response;
    }, (error) => {
      dispatch(receiveToken('', false));
      return error;
    });
  }
);

const logout = () => (
  (dispatch) => {
    dispatch(requestToken());

    return api.logout().then((response) => {
      dispatch(receiveToken('', false));
      dispatch(resetUser());
      return response;
    }, error => error);
  }
);

export default {
  receiveToken,
  requestToken,
  login,
  logout,
  fetchUser,
  checkToken,
};
