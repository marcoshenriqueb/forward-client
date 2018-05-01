import api from './../../api';
import store from './../../store';

const requestOrders = () => (
  {
    type: 'REQUEST_ORDERS',
  }
);

const receiveOrders = orders => (
  {
    type: 'RECEIVE_ORDERS',
    orders,
  }
);

const addOrder = order => (
  {
    type: 'ADD_ORDER',
    order,
  }
);

const createdCallback = (message) => {
  if (store.getState().auth.user.data.business !== message.business) return;

  store.dispatch(addOrder(message));
};

const updateOrder = order => (
  {
    type: 'UPDATE_ORDER',
    order,
  }
);

const updatedCallback = (message) => {
  if (store.getState().auth.user.data.business !== message.business) return;

  store.dispatch(updateOrder(message));
};

const removeOrder = order => (
  {
    type: 'REMOVE_ORDER',
    order,
  }
);

const removedCallback = (message) => {
  if (store.getState().auth.user.data.business !== message.business) return;

  store.dispatch(removeOrder(message));
};

const fetchOrders = () => (
  (dispatch) => {
    dispatch(requestOrders());

    api.orders.on('created', createdCallback);
    api.orders.on('patched', updatedCallback);
    api.orders.on('updated', updatedCallback);
    api.orders.on('removed', removedCallback);

    return api.orders.find({}).then((response) => {
      dispatch(receiveOrders(response.data));
      return response;
    }, (error) => {
      dispatch(receiveOrders([]));
      return error;
    });
  }
);

const resetOrdersState = () => (
  {
    type: 'RESET_ORDERS',
  }
);

const resetOrders = () => (
  (dispatch) => {
    api.orders.removeListener('created', createdCallback);
    api.orders.removeListener('patched', updatedCallback);
    api.orders.removeListener('updated', updatedCallback);
    api.orders.removeListener('removed', removedCallback);

    dispatch(resetOrdersState());
  }
);

export default {
  fetchOrders,
  resetOrders,
};
