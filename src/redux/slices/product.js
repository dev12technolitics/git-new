import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  addproduct: {},
  oneproduct: {},
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': "*",
};

const jsonheader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': "*",
};



const slice = createSlice({
  name: 'product',
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

    // GET b2b
    getproductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    postproductsuccess(state, action) {
      state.isLoading = false;
      state.addproduct = action.payload;
    },

    getproSuccess(state, action) {
      state.isLoading = false;
      state.oneproduct = action.payload;
    },

  },
});

export default slice.reducer;

export function getproduct() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/product/all', { headers: header });
      dispatch(slice.actions.getproductsSuccess(response.data.product));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postproduct(formData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/product/add', formData, { headers: header });
      dispatch(slice.actions.postproductsuccess(response.data.product));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putproduct(id, formData) {

  console.log("first::>", formData)
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/product/update/' + id, formData, { headers: header });
      console.log("first:::::>>>", response)
      dispatch(slice.actions.postproductsuccess(response.data.product));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function getOneProduct(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/product/one/' + id, { headers: header });
      dispatch(slice.actions.getproSuccess(response.data.product));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}