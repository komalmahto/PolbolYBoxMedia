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
