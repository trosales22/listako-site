import axios from 'axios';

interface LoginPayload {
  user_id: string;
  password: string;
}

interface UpdateMyProfilePayload {
  username?: string;
  email?: string;
  firstname: string;
  lastname?: string;
}

interface ChangePaswordPayload {
  old_password?: string;
  new_password?: string;
}

interface RegisterUserPayload {
  username?: string;
  email?: string;
  firstname: string;
  lastname?: string;
  password?: string;
}

export const login = (payload: LoginPayload) => axios.post('/api/v1/site/login', payload);

export const logout = () => axios.post('/api/v1/site/logout');

export const myProfile = () => axios.get('/api/v1/site/me/my_profile');

export const updateMyProfile = (payload: UpdateMyProfilePayload) =>
  axios.put('/api/v1/site/me/my_profile', payload);

export const changePassword = (payload: ChangePaswordPayload) =>
  axios.put('/api/v1/site/me/change_password', payload);

export const registerUser = (payload: RegisterUserPayload) =>
  axios.post('/api/v1/site/register_user', payload);
