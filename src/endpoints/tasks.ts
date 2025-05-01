import axios from 'axios';

interface TaskListParams {
  q?: string;
  page?: number;
  limit?: number;
}

export const getTaskList = (params: TaskListParams) =>
  axios.get(`/api/v1/site/me/tasks`, {
    params: params,
  });

export const getTaskById = (taskId: string | undefined | null) =>
  axios.get(`/api/v1/site/me/tasks/${taskId}`);

export const createTask = (payload: any) => axios.post(`/api/v1/site/me/tasks`, payload);

export const updateTask = (taskId: string | undefined, payload: any) =>
  axios.put(`/api/v1/site/me/tasks/${taskId}`, payload);

export const deleteTask = (taskId: string | undefined) =>
  axios.delete(`/api/v1/site/me/tasks/${taskId}`);
