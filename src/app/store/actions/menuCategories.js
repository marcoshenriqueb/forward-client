import api from './../../api';

const requestMenuCategories = () => (
  {
    type: 'REQUEST_MENU_CATEGORIES',
  }
);

const receiveMenuCategories = menuCategories => (
  {
    type: 'RECEIVE_MENU_CATEGORIES',
    menuCategories,
  }
);

const fetchMenuCategories = () => (
  (dispatch) => {
    dispatch(requestMenuCategories());

    return api.menuCategories.find({}).then((response) => {
      dispatch(receiveMenuCategories(response.data));
      return response;
    }, (error) => {
      dispatch(receiveMenuCategories([]));
      return error;
    });
  }
);

const resetMenuCategoriesState = () => (
  {
    type: 'RESET_MENU_CATEGORIES',
  }
);

const resetMenuCategories = () => (
  (dispatch) => {
    dispatch(resetMenuCategoriesState());
  }
);

export default {
  fetchMenuCategories,
  resetMenuCategories,
};
