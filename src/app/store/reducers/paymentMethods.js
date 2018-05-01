const initialState = {
  paymentMethods: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const paymentMethods = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PAYMENT_METHODS':
      return Object.assign({}, state, {
        paymentMethods: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'RECEIVE_PAYMENT_METHODS':
      return Object.assign({}, state, {
        paymentMethods: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.paymentMethods,
        },
      });

    case 'RESET_PAYMENT_METHODS':
      return initialState;

    default:
      return state;
  }
};

export default paymentMethods;
