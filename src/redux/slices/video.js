import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    videos: [],
    onevideo: {},
    addVideo: {},
    deleteStatus: false
};

const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

const header = {
    'Content-Type': 'multipart/form-data',
  
};

const jsonheader = {
    'Content-Type': 'application/json',
  
};


const slice = createSlice({
    name: 'video',
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

        // GET Video
        getvideosSuccess(state, action) {
            state.isLoading = false;
            state.videos = action.payload;
        },

        //GET Video
        getoneVideoSuccess(state, action) {
            state.isLoading = false;
            state.onevideo = action.payload;
        },

        //ADD Video
        postaddVideoSuccess(state, action) {
            state.isLoading = false;
            state.addVideo = action.payload;
        },

        //DELETE Video
        deletevideosSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },

    },
});

export default slice.reducer;


export function getVideoAll() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/gallery/video/all');
            console.log("gellary",response.data )
            dispatch(slice.actions.getvideosSuccess(response.data.video));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOneVideo(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/gallery/video/one/' + id);
            dispatch(slice.actions.getoneVideoSuccess(response.data.video));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postVideo(formData, toast, push, reset) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/gallery/video/add', formData, { headers: jsonheader });
            dispatch(slice.actions.postaddVideoSuccess(response.data));
            toast.success(response.data?.message)
            if (response.data.status == true) {
                reset()
                push('/dashboard/gallery/video/')
            }
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function putVideo(id, formData, toast, push, reset) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put('/gallery/video/update/' + id, formData, { headers: jsonheader });
            dispatch(slice.actions.postaddVideoSuccess(response.data.video));
            toast.success(response.data?.message)
            if (response.data.status == true) {
                reset()
                push('/dashboard/gallery/video')
            }
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteVideo(id, toast) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete('/gallery/video/delete/' + id, { headers: jsonheader });
            dispatch(slice.actions.deletevideosSuccess(response.data.status));
            toast.success(response.data?.message)
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}