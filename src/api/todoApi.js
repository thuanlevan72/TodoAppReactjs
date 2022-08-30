import axiosClient from "./axiosClient";

const todoApi = {
  getAll: (params = null) => {
    const url = "/Todo";
    return axiosClient.get(url, { params });
  },
  Posttodo: (data, params = null) => {
    const url = "/Todo";
    console.log(params);
    return axiosClient.post(url, data, {});
  },
  getOneId: (id) => {
    const url = `/Todo/${id}`;
    return axiosClient.get(url);
  },
  DleTodo: (id) => {
    const url = `/Todo/${id}`;
    return axiosClient.delete(url);
  },
  updateStatus: (data) => {
    const url = `/Todo`;
    return axiosClient.put(url, data);
  },
};

export default todoApi;
