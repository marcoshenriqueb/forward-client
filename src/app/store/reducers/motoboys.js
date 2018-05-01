const initialState = {
  motoboys: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const motoboys = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_MOTOBOYS':
      return Object.assign({}, state, {
        motoboys: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'RECEIVE_MOTOBOYS':
      return Object.assign({}, state, {
        motoboys: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.motoboys,
        },
      });

    case 'RESET_MOTOBOYS':
      return initialState;

    default:
      return state;
  }
};

export default motoboys;
