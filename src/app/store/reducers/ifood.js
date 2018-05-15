const initialState = {
  authenticated: false,
  token: {
    isFetching: false,
    lastUpdated: '',
    data: '',
  },
  acknowledgedOrders: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_IFOOD_TOKEN':
      return Object.assign({}, state, {
        token: {
          data: '',
          isFetching: true,
          lastUpdated: '',
        },
        authenticated: false,
      });

    case 'RECEIVE_IFOOD_TOKEN':
      return Object.assign({}, state, {
        token: {
          data: action.token,
          isFetching: false,
          lastUpdated: Date.now(),
        },
        authenticated: action.auth,
      });

    case 'RESET_IFOOD_TOKEN':
      return Object.assign({}, state, {
        token: {
          data: '',
          isFetching: false,
          lastUpdated: '',
        },
        authenticated: false,
      });

    case 'ACKNOWLEDGE_IFOOD_ORDERS':
      return Object.assign({}, state, {
        acknowledgedOrders: [
          ...state.acknowledgedOrders,
          ...action.orders.filter(o => o.code === 'PLACED'),
        ],
      });

    case 'REMOVE_ACKNOWLEDGED_IFOOD_ORDER':
      return Object.assign({}, state, {
        acknowledgedOrders: state.acknowledgedOrders.filter(o => o.id !== action.id),
      });

    default:
      return state;
  }
};

export default auth;
