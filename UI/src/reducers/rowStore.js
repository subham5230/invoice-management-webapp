const initialValue = {
    rows:[],
    selectedRows:[],
    searchVal : "",
    count : 0,
    hasMore : false,
    sortOrder : 0,
    sortBy: "",
    gotData: true,
    visited: false,
}

const rowReducer = (state = initialValue, action) => {
    switch (action.type) {
      case 'ChangeRows':
        return {
          ...state,
          rows: action.data,
        };

        case 'SelectRows':
            return {
            ...state,
            selectedRows: action.data
        };
        case 'GetSearch':
          return {
            ...state,
            searchVal: action.data,
        };
        case 'RowCount':
          return {
            ...state,
            count: action.data,
        };
        case 'HasMore':
          return {
            ...state,
            hasMore: action.data,
        };
        case 'SortOrder':
          return {
            ...state,
            sortOrder: action.data,
        };
        case 'SortBy':
          return {
            ...state,
            sortBy: action.data,
        };

        case 'GotData':
          return {
            ...state,
            gotData: action.data,
        };

        case 'Visited':
          return {
            ...state,
            visited: action.data,
        };
      default:
        return state;
    }
  };
  
export default rowReducer;