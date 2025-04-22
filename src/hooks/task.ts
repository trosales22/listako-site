import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import * as fns from 'endpoints/tasks';
import { removeEmpty } from 'utils';

type TaskListParams = {
    params?: any;
    queryOptions?: UseQueryOptions;
};

type TaskShowParams = {
    taskId?: string | undefined | null;
    queryOptions?: UseQueryOptions;
};

export const useListTaskQuery = ({ params, queryOptions }: TaskListParams) => {
    return useQuery({
      queryKey: ['TASK_LIST', removeEmpty(params)],
      queryFn: () => fns.getTaskList(params),
      retry: false,
      ...queryOptions
    });
};
  
export const useShowTaskByIdQuery = ({taskId, queryOptions}: TaskShowParams) => {
    return useQuery({
        queryKey: ['TASK_SHOW', taskId],
        queryFn: () => fns.getTaskById(taskId),
        retry: false,
        ...queryOptions
    });
};

export const useCreateTaskMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
    return useMutation({
        mutationKey: ['TASK_CREATE'],
        mutationFn: (payload) => fns.createTask(payload),
        ...mutationOptions
    });
};

export const useUpdateTaskMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, string, any>) => {
    return useMutation({
        mutationKey: ['TASK_UPDATE'],
        mutationFn: ({ taskId, payload }) =>
        fns.updateTask(taskId, payload),
        ...mutationOptions
    });
};

export const useDeleteTaskMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
    return useMutation({
        mutationKey: ['TASK_DELETE'],
        mutationFn: ({ taskId }) => fns.deleteTask(taskId),
        ...mutationOptions
    });
};