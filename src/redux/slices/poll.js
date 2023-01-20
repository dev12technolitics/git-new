import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  Allpoll: [],
  deleteStatus: false,
  onepoll: {},
  addpoll: {},
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

    // GET poll
    getPollSuccess(state, action) {
      state.isLoading = false;
      state.Allpoll = action.payload;
    },

    //Delete poll
    deletePollSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },

    //one poll
    getOnepollSuccess(state, action) {
      state.isLoading = false;
      state.onepoll = action.payload;
    },

    //ADD update poll
    putpostPollSuccess(state, action) {
      state.isLoading = false;
      state.addpoll = action.payload;
    },


  },
});

export default slice.reducer;

//add poll
export function getPoll() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/poll/all', { headers: header });
      dispatch(slice.actions.getPollSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

//Delete poll
export function deletePoll(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      
      const response = await axios.put('/poll/delete/' + id, { headers: jsonheader });
      console.log("response",response)
      dispatch(slice.actions.deletePollSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//one poll
export function getOnepoll(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/poll/one/' + id, { headers: jsonheader });
      dispatch(slice.actions.getOnepollSuccess(response.data.poll));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ADD poll
export function postPoll(payload, toast, push, reset, setIsLoading) {
  console.log("payload", payload)
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/poll/add', payload, { headers: jsonheader });
      dispatch(slice.actions.putpostPollSuccess(response.data));
      toast.success(response.data?.message)
      if (response.data.status == true) {
        setIsLoading(false);
        reset()
        push('/dashboard/poll')
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

// update poll
export function putPoll(id, payload, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/poll/update/' + id, payload, { headers: jsonheader });
      dispatch(slice.actions.putpostPollSuccess(response.data));
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        reset()
        push('/dashboard/poll');
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


