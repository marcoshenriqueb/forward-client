const initialState = {
  menuCategories: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const menuCategories = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_MENU_CATEGORIES':
      return Object.assign({}, state, {
        menuCategories: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'RECEIVE_MENU_CATEGORIES':
      return Object.assign({}, state, {
        menuCategories: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.items,
        },
      });

    case 'RESET_MENU_CATEGORIES':
      return initialState;

    default:
      return state;
  }
};

export default menuCategories;
