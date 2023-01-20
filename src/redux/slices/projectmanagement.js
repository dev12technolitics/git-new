import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  projects: [],
  addproject: {},
  oneproject: {},
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
  name: 'project',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS project
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET project
    getSuccessproject(state, action) {
      state.isLoading = false;
      state.projects = action.payload;
    },

    getoneSuccessproject(state, action) {
      state.isLoading = false;
      state.oneproject = action.payload;
    },

    postProjectSuccess(state, action) {
      state.isLoading = false;
      state.addproject = action.payload;
    },

    deleteSuccessproject(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getAllProject() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/project/all', { headers: header });
      dispatch(slice.actions.getSuccessproject(response.data.project));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getoneproject(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/project/one/' + id, { headers: header });

      dispatch(slice.actions.getoneSuccessproject(response.data.project));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postnewproject(payload, toast, push, setIsLoading) {
  return async () => {
    try {
      const response = await axios.post('/project/add', payload, { headers: jsonheader });
      if (response.data.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/project');
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
}

export function putproject(id, payload, toast, push, setIsLoading) {
  return async () => {
    try {
      const response = await axios.put('/project/update/' + id, payload, { headers: jsonheader });
      if (response.data.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/project');
      } else {
        setIsLoading(false);
        toast.error(response.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
}

export function putprojectstatus(id, formData, toast) {
  // console.log('my', formData, id);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/project/status_update/' + id, formData, { headers: jsonheader });
      dispatch(slice.actions.postProjectSuccess(response.data.project));
      console.log('ggg', response);
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteproject(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/stories/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteSuccessproject(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}
