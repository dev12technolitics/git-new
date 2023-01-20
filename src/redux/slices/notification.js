import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
  addnotification: {},
  oneNotification: {},
  deleteStatus: false,
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
const header = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': "*",
  'x-access-token': accessToken,
};
const jsonheader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': "*",
  'x-access-token': accessToken,
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BANNER
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },

    getNotificationSuccess(state, action) {
      state.isLoading = false;
      state.oneNotification = action.payload;
    },

    postNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.addnotification = action.payload;
    },

    deleteNotificationSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getNotifications() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/notification/all', { headers: header });
      dispatch(slice.actions.getNotificationsSuccess(response.data.notification));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOnenotification(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/notification/one/' + id, { headers: header });
      dispatch(slice.actions.getNotificationSuccess(response.data.notification));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postNotifications(formData, toast, push, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/notification/add', formData, { headers: header });
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/notification');
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putNotifications(id, formData, toast, push, setIsLoading) {
  
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/notification/update/' + id, formData, { headers: jsonheader });
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/notification');
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteNotifications(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/notification/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteNotificationSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}
