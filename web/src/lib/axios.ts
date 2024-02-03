import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    handleApiError(error);

    return Promise.reject(error);
  }
);

function handleApiError(error: AxiosError) {
  if (error.response) {
    console.error("Request failed with status code:", error.response.status);
    console.error("Response data:", error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Request setup error:", error.message);
  }
  console.error("Error config:", error.config);
}

export default api;
