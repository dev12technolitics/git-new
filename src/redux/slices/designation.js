import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  designations: [],
  designationsallstatus: [],
  adddesignation: {},
  onedesignation: {},
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
  name: 'designation',
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

    // GET Designation
    getdesignationSuccess(state, action) {
      state.isLoading = false;
      state.designations = action.payload;
    },

     // GET Designation
     getDesignationStatusSuccess(state, action) {
      state.isLoading = false;
      state.designationsallstatus = action.payload;
    },

    getdesignation_Success(state, action) {
      state.isLoading = false;
      state.onedesignation = action.payload;
    },

    postdesignationdataSuccess(state, action) {
      state.isLoading = false;
      state.adddesignation = action.payload;
    },
   
    deleteDesignationSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});
 
export default slice.reducer;

export function getdesignation() { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/commondesignations/all', { headers: header });
      dispatch(slice.actions.getdesignationSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDesignationStatus() { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/commondesignations/active/all', { headers: header });
      dispatch(slice.actions.getDesignationStatusSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneDesignation(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/commondesignations/one/' + id, { headers: header });
      dispatch(slice.actions.getdesignation_Success(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postdesignation(formData, toast, setIsLoading) {
  
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/commondesignations/add', formData, { headers: jsonheader });
      setIsLoading(false);
      dispatch(slice.actions.postdesignationdataSuccess(response.data.result));
      toast.success(response.data?.message)
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putdesignation(id, formData, toast, setIsLoading) {
 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/commondesignations/update/' + id, formData, { headers: jsonheader });
      setIsLoading(false);
      dispatch(slice.actions.postdesignationdataSuccess(response.data.result));
      toast.success(response.data?.message)
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteDesignation(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/commondesignations/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteDesignationSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

