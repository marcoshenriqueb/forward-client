import store from '../index';
import api from './../../api';
import order from './orders';

const getHeaders = token => ({
  Authorization: `bearer ${token}`,
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
});

const requestToken = () => (
  {
    type: 'REQUEST_IFOOD_TOKEN',
  }
);

const receiveToken = (token, auth) => (
  {
    type: 'RECEIVE_IFOOD_TOKEN',
    token,
    auth,
  }
);

const acknowledgeOrders = orders => (
  {
    type: 'ACKNOWLEDGE_IFOOD_ORDERS',
    orders,
  }
);

const removeAcknowledgedOrder = id => (
  {
    type: 'REMOVE_ACKNOWLEDGED_IFOOD_ORDER',
    id,
  }
);

const getOrderDetails = () => (
  (dispatch) => {
    const orders = store.getState().ifood.acknowledgedOrders;
    if (!orders.length) return;

    api.request({
      url: `${process.env.REACT_APP_IFOOD_API_URL}v1.0/orders/${orders[0].correlationId}`,
      method: 'get',
      headers: getHeaders(store.getState().ifood.token.data),
    }).then((data) => {
      const cash = data.data.payments.filter(p => p.code === 'DIN');
      order.createOrder({
        address: data.data.deliveryAddress.formattedAddress,
        paymentMethodIfoodCodes: data.data.payments.map(p => p.code),
        change: cash.length ? cash[0].change - cash[0].value : 0,
        clientName: data.data.customer.name,
      })().catch((error) => { console.log(3, error); });
      dispatch(removeAcknowledgedOrder(orders[0].id));
    });
  }
);

const acknowledgeOrdersRequest = orders => (
  (dispatch) => {
    api.request({
      url: `${process.env.REACT_APP_IFOOD_API_URL}v1.0/events/acknowledgment`,
      method: 'post',
      headers: getHeaders(store.getState().ifood.token.data),
      data: orders.map(o => ({ id: o.id })),
    }).then(() => {
      dispatch(acknowledgeOrders(orders));
    }).catch(() => {});
  }
);

const ifoodEventsPooling = () => (
  (dispatch) => {
    setInterval(() => {
      api.request({
        headers: getHeaders(store.getState().ifood.token.data),
        method: 'get',
        url: `${process.env.REACT_APP_IFOOD_API_URL}v1.0/events:polling`,
      }).then((response) => {
        acknowledgeOrdersRequest(response.data)(dispatch);
        setTimeout(() => getOrderDetails()(dispatch), 5000);
        return response;
      }, () => {
        getOrderDetails()(dispatch);
      });
    }, 10000);
  }
);

const requestIfoodToken = () => (
  (dispatch) => {
    dispatch(requestToken());

    return api.ifoodAuth.create({}).then((response) => {
      dispatch(receiveToken(JSON.parse(response).access_token, true));
      ifoodEventsPooling()(dispatch);
      return response;
    }, (error) => {
      dispatch(receiveToken('', false));
      return error;
    });
  }
);

export default {
  requestIfoodToken,
  ifoodEventsPooling,
};
