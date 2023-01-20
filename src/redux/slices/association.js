import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  allAssociation: [],
  addAssociation: {},
  oneAssociation: {},
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

    // GET association
    getAssociationSuccess(state, action) {
      state.isLoading = false;
      state.allAssociation = action.payload;
    },

    oneAssociationSuccess(state, action) {
      state.isLoading = false;
      state.oneAssociation = action.payload;
    },

    postputAssociationSuccess(state, action) {
      state.isLoading = false;
      state.addAssociation = action.payload;
    },

    deleteAssociationSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },
  },
});

export default slice.reducer;

export function getAssociation() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/association/all', { headers: jsonheader });
      dispatch(slice.actions.getAssociationSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneAssociation(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/association/one/' + id, { headers: header });
      dispatch(slice.actions.oneAssociationSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postAssociation(formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/association/add', formData, { headers: jsonheader });
      toast.success(response.data?.message)
      dispatch(slice.actions.postputAssociationSuccess(response.data.data));
      if (response.data.status == true) {
        setIsLoading(false);
        reset()
        push('/dashboard/association')
    }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putAssociation(id, formData, toast, push, reset, setIsLoading) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/association/update/detail/' + id, formData, { headers: header });
      dispatch(slice.actions.postputAssociationSuccess(response.data.data));
      toast.success(response.data?.message)
      if (response.data.status == true) {
        setIsLoading(false);
        reset()
        push('/dashboard/association')
    }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteAssociation(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/association/delete/' + id, { headers: header });
      dispatch(slice.actions.deleteAssociationSuccess(response.data.status));
      toast.success(response.data?.message)
    } catch (error) {
      toast.error(error?.message)
      dispatch(slice.actions.hasError(error));
    }
  };
}
