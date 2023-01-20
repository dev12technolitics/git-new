import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allmembers: [],
  deleteStatus: false,
  addmembers: {},
  onemember: {},
  addForgetpassword: {},
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
  'Content-Type': 'multipart/form-data',
};

const jsonheader = {
  'Content-Type': 'application/json',
  'x-access-token': accessToken,
};

const slice = createSlice({
  name: 'members',
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

    // get Members
    getmembersSuccess(state, action) {
      state.isLoading = false;
      state.allmembers = action.payload;
    },

    // Delete Members
    deletemembersSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },

    //ADD members
    postsMembersSuccess(state, action) {
      state.isLoading = false;
      state.addmembers = action.payload;
    },

    //one members
    getonememberSuccess(state, action) {
      state.isLoading = false;
      state.onemember = action.payload;
    },

    // Forgetpassword
    postForgetpasswordSuccess(state, action) {
      state.isLoading = false;
      state.addForgetpassword = action.payload;
    },

  },
});

export default slice.reducer;

// get Members
export function getmembers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/adminuser/all', { headers: header });
      dispatch(slice.actions.getmembersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Delete Members
export function deletemembers(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/adminuser/delete/' + id, { headers: header });
      dispatch(slice.actions.deletemembersSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ADD Members
export function postmembers(formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/member/signup', formData, { headers: header });
      dispatch(slice.actions.postsMembersSuccess(response.data));
      toast.success(response.data?.message);
      if (response.data.status == true) {
        setIsLoading(false);
        reset();
        push('/dashboard/members');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// update members
export function putupdatemembers(id, formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/adminuser/update/' + id, formData, { headers: header });
      dispatch(slice.actions.postsMembersSuccess(response.data));
      toast.success(response.data?.message);
      if (response.data.status == true) {
        setIsLoading(false);
        reset();
        push('/dashboard/members');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//one members
export function getOnemember(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/adminuser/one/' + id, { headers: header });
      dispatch(slice.actions.getonememberSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// uodate password
export function postForgetpassword(id, data, toast, push) {
  console.log('data@', data);
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/adminuser/updatepassword/' + id, data, { headers: jsonheader });
      dispatch(slice.actions.postForgetpasswordSuccess(response.data));
      toast.success(response.data?.message);
      if (response.data.status == true) {
        push('/dashboard/members');
      }
    } catch (error) {
      toast?.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}


