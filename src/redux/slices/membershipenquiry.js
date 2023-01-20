import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allEnquiry: []
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
  name: 'membershipenquiry',
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

    // GET membership enquiry
    getMembershipEnquirySuccess(state, action) {
      state.isLoading = false;
      state.allEnquiry = action.payload;
    },
  
  },
});

export default slice.reducer;

export function getMembershipEnquiry() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/enquiry/all', { headers: header });
      dispatch(slice.actions.getMembershipEnquirySuccess(response.data.enquiry));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
