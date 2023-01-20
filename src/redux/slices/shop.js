import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allshop: [],
  addshop: {},
  oneShop: {},
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
  name: 'shop',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET shop
    getShopSuccess(state, action) {
      state.isLoading = false;
      state.allshop = action.payload;
    },

    oneShopSuccess(state, action) {
      state.isLoading = false;
      state.oneShop = action.payload;
    },

    postputShopSuccess(state, action) {
      state.isLoading = false;
      state.addshop = action.payload;
    },

    deleteShopSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getShop() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/merchandise/all', { headers: header });
      dispatch(slice.actions.getShopSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneShop(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/merchandise/one/' + id, { headers: header });
      console.log("response",response.data)
      dispatch(slice.actions.oneShopSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postShop(formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/merchandise/add', formData, { headers: header });
      toast.success(response.data?.message)
      dispatch(slice.actions.postputShopSuccess(response.data.data));
      if (response.data.status == true) {
        setIsLoading(false);
        reset()
        push('/dashboard/shop')
    }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putShop(id, formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/merchandise/update/' + id, formData, { headers: header });
      dispatch(slice.actions.postputShopSuccess(response.data.data));
      toast.success(response.data?.message)
      if (response.data.status == true) {
        setIsLoading(false);
        reset()
        push('/dashboard/shop')
    }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteShop(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/merchandise/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteShopSuccess(response.data.status));
      toast.success(response.data?.message)
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}
