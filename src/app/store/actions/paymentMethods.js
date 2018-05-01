import api from './../../api';

const requestPaymentMethods = () => (
  {
    type: 'REQUEST_PAYMENT_METHODS',
  }
);

const receivePaymentMethods = paymentMethods => (
  {
    type: 'RECEIVE_PAYMENT_METHODS',
    paymentMethods,
  }
);

const fetchPaymentMethods = () => (
  (dispatch) => {
    dispatch(requestPaymentMethods());

    return api.paymentMethods.find({}).then((response) => {
      dispatch(receivePaymentMethods(response.data));
      return response;
    }, (error) => {
      dispatch(receivePaymentMethods([]));
      return error;
    });
  }
);

const resetPaymentMethodsState = () => (
  {
    type: 'RESET_PAYMENT_METHODS',
  }
);

const resetPaymentMethods = () => (
  (dispatch) => {
    dispatch(resetPaymentMethodsState());
  }
);

export default {
  fetchPaymentMethods,
  resetPaymentMethods,
};
