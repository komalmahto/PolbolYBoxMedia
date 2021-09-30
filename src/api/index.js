import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.polbol.in/backend",
  headers: {
    "Content-Type": "application/json",
  },
});

// API CALLS

export const getLatestNews = (english) =>
  api.get(`/notification/latest?language=${english}`);

// Poll Routes
export const getCommonPolls = () => api.get(`/common/polls`);
export const getHighlightedPolls = () =>
  api.get(`/polls/highlighted?language=english`);
export const getActivePolls = () => api.get(`/common/polls?mode=active`);
export const getExpiredPolls = () => api.get(`/common/polls?mode=expired`);
export const getFilteredPolls = (mode, categories) =>
  api.get(`/common/polls?mode=${mode}&categories=${categories}`);
export const getPollResults = (pollId) =>
  api.get(`/poll/results/guest?id=${pollId}`);

export const getActiveAwards = () => api.get(`/award/fetchAwardsAndCategories`);
export const getCommonPetitions = () => api.get("/common/petitions");
export const getHighlightedPetitions = () =>
  api.get(`/petitions/highlighted?language=english`);
export const getActivePetitions = () =>
  api.get(`/common/petitions`);
export const getExpiredPetitions = () =>
  api.get(`/common/petitions?mode=expired`);
export const getFilteredPetitions = (mode, categories) =>
  api.get(`/common/petitions?mode=${mode}&categories=${categories}`);

  export const getPetitionResults = (petitionId) =>
  api.get(`/petition/${petitionId}`);

  export const getNews=()=>
    api.get('/news?hindi=false');
  
  export const getFilteredNews = (categories) =>
  api.get(`/news?hindi=false&categories=${categories}`);

  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
  
    if (localStorage.getItem("authToken")) {
      return JSON.parse(localStorage.getItem("authToken"));
    } else {
      return false;
    }
  };