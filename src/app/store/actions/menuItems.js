import api from './../../api';

const requestMenuItems = () => (
  {
    type: 'REQUEST_MENU_ITEMS',
  }
);

const receiveMenuItems = items => (
  {
    type: 'RECEIVE_MENU_ITEMS',
    items,
  }
);

const fetchMenuItems = () => (
  (dispatch) => {
    dispatch(requestMenuItems());

    return api.menuItems.find({}).then((response) => {
      dispatch(receiveMenuItems(response.data));
      return response;
    }, (error) => {
      dispatch(receiveMenuItems([]));
      return error;
    });
  }
);

const resetMenuItemsState = () => (
  {
    type: 'RESET_MENU_ITEMS',
  }
);

const resetMenuItems = () => (
  (dispatch) => {
    dispatch(resetMenuItemsState());
  }
);

export default {
  fetchMenuItems,
  resetMenuItems,
};
