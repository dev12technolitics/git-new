import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  feedbacks: [],
  oneFeedback:{}
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
  'Content-Type': 'multipart/form-data',
  'x-access-token': accessToken,
};

const jsonheader = {
  'Content-Type': 'application/json',
  'x-access-token': accessToken,
};

const slice = createSlice({
  name: 'feedback',
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

    // GET Feedback
    getFeedbacksSuccess(state, action) {
      state.isLoading = false;
      state.feedbacks = action.payload;
    },

    // GET Feedback
    getoneFeedbackSuccess(state, action) {
      state.isLoading = false;
      state.oneFeedback = action.payload;
    },

  },
});

export default slice.reducer;

export function getFeedbacks() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/feedback/all', { headers: header });
      dispatch(slice.actions.getFeedbacksSuccess(response.data.feedback));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getoneFeedback(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/feedback/one/' + id);
      dispatch(slice.actions.getoneFeedbackSuccess(response.data.feedback));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

