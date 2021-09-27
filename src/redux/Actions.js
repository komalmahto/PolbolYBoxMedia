export const updatestateCategory = (category = "") => {
  return {
    type: "SET_CATEGORY_STATE",
    payload: category,
  };
};

export const updatestateTitle = (title = "") => {
  return {
    type: "SET_TITLE_STATE",
    payload: title,
  };
};
export const updatestateProblem = (problem = "") => {
  return {
    type: "SET_PROBLEM_STATE",
    payload: problem,
  };
};
export const updatestateRelink = (reflink = "") => {
  return {
    type: "SET_REFLINK_STATE",
    payload: reflink,
  };
};
export const updatestatePhoto = (photo = null) => {
  return {
    type: "SET_PHOTO_STATE",
    payload: photo,
  };
};
