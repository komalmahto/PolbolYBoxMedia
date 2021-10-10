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
export const updatestateDescription = (desc = "") => {
  return {
    type: "SET_DESC_STATE",
    payload: desc,
  };
};
export const updatestateExpectedSignatures = (expectedsign = 0) => {
  return {
    type: "SET_EXPECTEDSIGN_STATE",
    payload: expectedsign,
  };
};
export const updatestateLifespan = (lifespan = null) => {
  return {
    type: "SET_LIFESPAN_STATE",
    payload: lifespan,
  };
};

export const updateLanguage=(language="eng")=>{
  return {
    type:'SET_LANGUAGE',
    payload:language,
  }
}