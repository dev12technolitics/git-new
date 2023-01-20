import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  cityall: [],
  citystatusall: [],
  addcity: {},
  oneCity: {},
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
  name: 'city',
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

    // GET city
    getcitySuccess(state, action) {
      state.isLoading = false;
      state.cityall = action.payload;
    },

    // GET city status
    getcityStatusSuccess(state, action) {
      state.isLoading = false;
      state.citystatusall = action.payload;
    },

    getOnecitySuccess(state, action) {
      state.isLoading = false;
      state.oneCity = action.payload;
    },

    postputcitySuccess(state, action) {
      state.isLoading = false;
      state.addcity = action.payload;
    },

    deleteCitySuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});
 
export default slice.reducer;

export function getcity() { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/city/all', { headers: header });
      dispatch(slice.actions.getcitySuccess(response.data.city));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getcityStatus() { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/city/web/all', { headers: header });
      dispatch(slice.actions.getcityStatusSuccess(response.data.city));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOnecity(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/city/one/' + id, { headers: header });
      dispatch(slice.actions.getOnecitySuccess(response.data.city));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postcity(formData, toast, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/city/add', formData, { headers: header });
      setIsLoading(false);
      dispatch(slice.actions.postputcitySuccess(response.data.city));
      toast.success(response.data?.message)
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putcity(id, formData, toast, setIsLoading) {
 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/city/update/' + id, formData, { headers: header });
      setIsLoading(false);
      dispatch(slice.actions.postputcitySuccess(response.data.designation));
      toast.success(response.data?.message)
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCity(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/city/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteCitySuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}
