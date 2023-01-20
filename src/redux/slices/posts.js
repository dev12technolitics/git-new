import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allposts: [],
  addpost: {},
  oneposts: {},
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
  name: 'posts',
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

    // GET posts
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.allposts = action.payload;
    },

    getOnePostsSuccess(state, action) {
      state.isLoading = false;
      state.oneposts = action.payload;
    },

    postaddupdatepostSuccess(state, action) {
      state.isLoading = false;
      state.addpost = action.payload;
    },

    deletePostsSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getPosts() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/post/all', { headers: jsonheader });
      dispatch(slice.actions.getPostsSuccess(response.data.post));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOnePosts(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/post/one/' + id, { headers: header });
      dispatch(slice.actions.getOnePostsSuccess(response.data.post));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postPosts(formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/post/add', formData, { headers: header });
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/posts');
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

export function putPosts(id, formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/post/update/' + id, formData, { headers: jsonheader });
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/posts');
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

export function deletePosts(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/post/delete/' + id, { headers: header });
      dispatch(slice.actions.deletePostsSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}
