const initialState = {
  orders: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_ORDERS':
      return Object.assign({}, state, {
        orders: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'RECEIVE_ORDERS':
      return Object.assign({}, state, {
        orders: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.orders,
        },
      });

    case 'ADD_ORDER':
      return Object.assign({}, state, {
        orders: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: [...state.orders.data, action.order],
        },
      });

    case 'UPDATE_ORDER':
      return Object.assign({}, state, {
        orders: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: state.orders.data.map((o) => {
            if (o._id === action.order._id) {
              return action.order;
            }

            return o;
          }),
        },
      });

    case 'REMOVE_ORDER':
      return Object.assign({}, state, {
        orders: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: state.orders.data.filter(o => o._id !== action.order._id),
        },
      });

    case 'RESET_ORDERS':
      return initialState;

    default:
      return state;
  }
};

export default orders;
