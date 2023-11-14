import * as types from "./actionTypes";

const setVideo = (payload:object) => {
  return { type: types.SET_CURRENT_VIDEO, payload };
};

export { setVideo };
