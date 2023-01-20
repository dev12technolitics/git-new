import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  banners: [],
  addbanner: {},
  oneBanner: {},
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
  name: 'banner',
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
    getBannersSuccess(state, action) {
      state.isLoading = false;
      state.banners = action.payload;
    },

    //GET SPECIFICE BANNER

    getBannerSuccess(state, action) {
      state.isLoading = false;
      state.oneBanner = action.payload;
    },

    //ADD BANNER
    postBannersSuccess(state, action) {
      state.isLoading = false;
      state.addbanner = action.payload;
    },

    //DELETE BANNER
    deleteBannerSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getBanners() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/banner/all', { headers: header });
      dispatch(slice.actions.getBannersSuccess(response.data.banners));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOnebanner(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/banner/one/' + id, { headers: header });
      dispatch(slice.actions.getBannerSuccess(response.data.banner));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ADD BANNER
export function postBanners(formData, toast, push, setIsLoading) {
  return async () => {
    try {
      const response = await axios.post('/banner/add', formData, { headers: header });
      if (response.data?.status) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/banner');
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

export function putBanners(id, formData, toast, push, setIsLoading) {
  return async () => {
    try {
       
      const response = await axios.put('/banner/update/' + id, formData, { headers: header });
      if (response.data?.status) {
        setIsLoading(false);
        toast.success(response.data?.message);
        push('/dashboard/banner');
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

export function deleteBanners(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/banner/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteBannerSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}
