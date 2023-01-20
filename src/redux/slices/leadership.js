import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allleadership: [],
  deleteStatus: false,
  oneleadership: {},
  addleadership: {},
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
  name: 'leadership',
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

    // GET leadership
    getLeadershipSuccess(state, action) {
      state.isLoading = false;
      state.allleadership = action.payload;
    },

    //Delete leadership
    deleteLeadershipSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },

    //one leadership
    oneleadershipSuccess(state, action) {
      state.isLoading = false;
      state.oneleadership = action.payload;
    },

    //ADD update leadership
    postsaddleadershipSuccess(state, action) {
      state.isLoading = false;
      state.addleadership = action.payload;
    },


  },
});

export default slice.reducer;

//add leadership
export function getLeadership() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/leadership/all', { headers: header });
      console.log("response.data.data",response.data.data)
      dispatch(slice.actions.getLeadershipSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

//Delete leadership
export function deleteLeadership(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/leadership/delete/' + id, );
      console.log("response",response)
      dispatch(slice.actions.deleteLeadershipSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//one leadership
export function getOneLeadership(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/leadership/one/' + id, { headers: header });
      dispatch(slice.actions.oneleadershipSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ADD leadership
export function postLeadership(formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/leadership/add', formData, { headers: header });
      dispatch(slice.actions.postsaddleadershipSuccess(response.data));
      toast.success(response.data?.message)
      if (response.data.status == true) {
        setIsLoading(false);
        reset()
        push('/dashboard/leadership')
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

// update leadership
export function putLeadership(id, formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/leadership/update/' + id, formData, { headers: jsonheader });
      dispatch(slice.actions.postsaddleadershipSuccess(response.data));
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/leadership');
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


