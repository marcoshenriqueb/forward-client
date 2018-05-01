import api from './../../api';
import businesses from './businesses';
import businessAreas from './businessAreas';
import menuCategories from './menuCategories';
import menuItems from './menuItems';
import paymentMethods from './paymentMethods';


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
    businesses.fetchBusiness()(dispatch),
    businessAreas.fetchBusinessAreas()(dispatch),
    menuCategories.fetchMenuCategories()(dispatch),
    menuItems.fetchMenuItems()(dispatch),
    paymentMethods.fetchPaymentMethods()(dispatch),
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

const resetState = (dispatch) => {
  businesses.resetBusiness()(dispatch);
  businessAreas.resetBusinessAreas()(dispatch);
  menuCategories.resetMenuCategories()(dispatch);
  menuItems.resetMenuItems()(dispatch);
  paymentMethods.resetPaymentMethods()(dispatch);
};

const logout = () => (
  (dispatch) => {
    dispatch(requestToken());

    return api.logout().then((response) => {
      dispatch(receiveToken('', false));
      dispatch(resetUser());
      resetState(dispatch);
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
