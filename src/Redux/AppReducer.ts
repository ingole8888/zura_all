import * as types from "./actionTypes";

const initState = {
  currentVideo: {},
  videos: [],
  page: 0,
  isLoading: false,
};

function AppReducer(state = initState, action:any) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_CURRENT_VIDEO: {
      return { ...state, currentVideo: payload };
    }
    case types.START_GET_VIDEOS: {
      return { ...state, isLoading: true };
    }
    case types.END_GET_VIDEOS: {
      return { ...state, isLoading: false };
    }
    case types.SUCCESS_GET_VIDEOS: {
      return { ...state, isLoading: false, videos: payload };
    }
    case types.CHANGE_PAGE: {
      return { ...state, page: payload };
    }
    default:
      return state;
  }
}

export { AppReducer };
