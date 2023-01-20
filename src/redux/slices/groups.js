import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  groupsalldata: [],
  associationsalldata: [],
  categorydata: [],
  deleteStatus: false,
  onegroup: {},
  oneassociation: {},
  addgroups: {},
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
const header = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
  'x-access-token': accessToken,
};
const jsonheader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'x-access-token': accessToken,
};

const slice = createSlice({
  name: 'groups',
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

    // GET groups
    getgroupsdataSuccess(state, action) {
      state.isLoading = false;
      state.groupsalldata = action.payload;
    },

    getassociationsdataSuccess(state, action) {
      state.isLoading = false;
      state.associationsalldata = action.payload;
    },

    // GET category
    getcategorySuccess(state, action) {
      state.isLoading = false;
      state.categorydata = action.payload;
    },

    //Delete group
    deletegroupsSuccess(state, action) {
      state.isLoading = false;
      state.deleteStatus = action.payload;
    },

    //one group
    getoneGroupSuccess(state, action) {
      state.isLoading = false;
      state.onegroup = action.payload;
    },

    getoneAssociationSuccess(state, action) {
      state.isLoading = false;
      state.oneassociation = action.payload;
    },

    //ADD update group
    postsaddgroupsSuccess(state, action) {
      state.isLoading = false;
      state.addgroups = action.payload;
      console.log('action.payload', action.payload);
    },
  },
});

export default slice.reducer;


export function getgroupsdata() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/group/all', { headers: header });
      dispatch(slice.actions.getgroupsdataSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getassociationsdata() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/association/all', { headers: header });
      dispatch(slice.actions.getassociationsdataSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

//All category
export function getcategory() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/category/all', { headers: header });
      dispatch(slice.actions.getcategorySuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

//Delete group
export function deletegroups(id, toast) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete('/group/delete/' + id);
      console.log('response', response);
      dispatch(slice.actions.deletegroupsSuccess(response.data.status));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//one group
export function getOnegroup(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/groupmember/detail/' + id, { headers: jsonheader });
      dispatch(slice.actions.getoneGroupSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOneassociation(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/association/one/' + id, { headers: jsonheader });
      dispatch(slice.actions.getoneAssociationSuccess(response.data.group));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ADD Members
export function postgroups(data, setIsLoading, toast, reset, push) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/group/add', data, { headers: jsonheader });
      dispatch(slice.actions.postsaddgroupsSuccess(response.data));
      toast.success(response.data?.message);
      if (response.data.status == true) {
        setIsLoading(false);
        reset();
        push('/dashboard/groups');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putgroups(id, payload, setIsLoading, toast, reset, push) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/group/update/' + id, payload, { headers: jsonheader });
      dispatch(slice.actions.postsaddgroupsSuccess(response.data));
      if (response.data?.status == true) {
        setIsLoading(false);
        toast.success(response.data?.message);
        reset();
        push('/dashboard/groups');
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

export function putgroupsMemberUpdate(payload, toast, push) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/groupmember/add', payload, { headers: jsonheader });
      if (response.data?.status == true) {
        toast.success(response.data?.message);
        push('/dashboard/groups');
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putgroupsMemberDelete(id, toast) {
  return async () => {
    try {
      const response = await axios.delete('/groupmember/delete/' + id, { headers: jsonheader });
      if (response.data?.status == true) {
        toast.success('Member Delete');
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function putassociationMemberDelete(id, data, toast) {
  return async () => {
    try {
      const response = await axios.put('/group/update/' + id, data, { headers: jsonheader });

      if (response.data?.status == true) {
        toast.success('Member Delete');
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
