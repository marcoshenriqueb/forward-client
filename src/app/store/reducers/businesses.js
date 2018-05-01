const initialState = {
  business: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const businesses = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_BUSINESS':
      return Object.assign({}, state, {
        business: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'RECEIVE_BUSINESS':
      return Object.assign({}, state, {
        business: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.business,
        },
      });

    case 'RESET_BUSINESS':
      return initialState;

    default:
      return state;
  }
};

export default businesses;
