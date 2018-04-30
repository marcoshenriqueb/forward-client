const initialState = {
  businessAreas: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const businessAreas = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_BUSINESS_AREAS':
      return Object.assign({}, state, {
        businessAreas: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'RECEIVE_BUSINESS_AREAS':
      return Object.assign({}, state, {
        businessAreas: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.areas,
        },
      });

    case 'RESET_BUSINESS_AREAS':
      return initialState;

    default:
      return state;
  }
};

export default businessAreas;
