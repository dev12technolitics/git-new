import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  designations: [],
  adddesignation: {},
  onedesignation: {}
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
  name: 'designationnar',
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
    getdesignationSuccess(state, action) {
      state.isLoading = false;
      state.designations = action.payload;
    },

    getdesignation_Success(state, action) {
      state.isLoading = false;
      state.onedesignation = action.payload;
    },

    postdesignationdataSuccess(state, action) {
      state.isLoading = false;
      state.adddesignation = action.payload;
    },
   
  },
});
 
export default slice.reducer;

export function getdesignation() { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/designation/all', { headers: header });
      dispatch(slice.actions.getdesignationSuccess(response.data.designation));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDesignationStatus() { 
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/designation/active/all', { headers: header });
      dispatch(slice.actions.getdesignationSuccess(response.data.designation));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneDesignation(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/designation/one/' + id, { headers: header });
      dispatch(slice.actions.getdesignation_Success(response.data.designation));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postdesignation(formData, toast, setIsLoading) {
  
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/designation/add', formData, { headers: jsonheader });
      setIsLoading(false);
      dispatch(slice.actions.postdesignationdataSuccess(response.data.country));
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
      const response = await axios.put('/designation/update/' + id, formData, { headers: jsonheader });
      setIsLoading(false);
      dispatch(slice.actions.postdesignationdataSuccess(response.data.designation));
      toast.success(response.data?.message)
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}


