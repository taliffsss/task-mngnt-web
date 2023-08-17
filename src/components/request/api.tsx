import createAxiosInstance from './createAxiosInstance';
import { Logger } from '../Utils/Logger';
import { FilteringTask } from '../interface/DataInterface';
import { setAuthToken } from '../redux/actions';

export const postTasks = async (data: any, dispatch: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.post("/api/task/create", data);
        Logger.info("Task posted successfully.", response.data);
        setNewAuthToken(dispatch, response.data.result?.data?.access_token);;
        return response.data;
    } catch (err) {
        Logger.error("Error posting task:", err);
        throw err;
    }
}

export const putTasks = async (id: number, data: any, dispatch?: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.put(`/api/task/update/${id}`, data);
        Logger.info(`Task with ID ${id} updated successfully.`, response.data);
        setNewAuthToken(dispatch, response.data.result?.data?.access_token);;
        return response.data;
    } catch (err) {
        Logger.error(`Error updating task with ID ${id}:`, err);
        throw err;
    }
}

export const deleteTasks = async (id: number, dispatch?: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.delete(`/api/task/delete/${id}`);
        Logger.info(`Data has been deleted.`, response.data);
        setNewAuthToken(dispatch, response.data.result?.data?.access_token);;
        return response.data;
    } catch (err) {
        Logger.error(`Unable to delete data ${id}:`, err);
        throw err;
    }
}

export const fetchTasks = async (query?: FilteringTask, dispatch?: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.get('/api/task/list', {
            params: query
        });
        Logger.info("Tasks fetched successfully.", response.data);
        setNewAuthToken(dispatch, response.data.result?.data?.access_token);;
        return response.data;
    } catch (err) {
        Logger.error("Error fetching tasks:", err);
        throw err;
    }
}

export const fetchTaskStatus = async (dispatch: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.get('/api/task-status/list');
        Logger.info("Status fetched successfully.", response.data);
        setNewAuthToken(dispatch, response.data.result?.data?.access_token);;
        return response.data;
    } catch (err) {
        Logger.error("Error fetching status:", err);
        throw err;
    }
}

export const signup = async (data: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.post('/api/signup', data);
        Logger.info("Signup successfully.", response.data);
        return response.data;
    } catch (err) {
        Logger.error("Error Signup:", err);
        throw err;
    }
}

export const login = async (data: any) => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.post('/api/auth/login', data);
        Logger.info("Login successfully.", response.data);
        return response.data;
    } catch (err) {
        Logger.error("Error Login:", err);
        throw err;
    }
}

export const loggingOut = async () => {
    const axiosInstance = await createAxiosInstance();
    try {
        const response = await axiosInstance.post('/api/auth/logout');
        Logger.info("Logout successfully.", response.data);
        return response.data;
    } catch (err) {
        Logger.error("Error Logout:", err);
        throw err;
    }
}

export const updateTaskStatus = async (taskId: number, newStatusId: number) => {
    return await putTasks(taskId, {task_status_id: newStatusId});
}

const setNewAuthToken = async (dispatch: any, token?: string) => {
    if (token) {
        dispatch(setAuthToken(token));
    }
}
