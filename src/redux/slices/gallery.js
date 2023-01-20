import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
    isLoading: false,
    error: null,
    galleryes: [],
    addgallery: {},
    onegallery: {},
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
    name: 'gallery',
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

        // GET gallerys
        getgallerysSuccess(state, action) {
            console.log("@123",action)
            state.isLoading = false;
            state.galleryes = action.payload;
        },

        //GET gallerys
        getonegallerySuccess(state, action) {
            state.isLoading = false;
            state.onegallery = action.payload;
        },

        //ADD grams
        postaddgallerySuccess(state, action) {
            state.isLoading = false;
            state.addgallery = action.payload;
        },

        //DELETE gallerys
        deletegallerySuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },

    },
});

export default slice.reducer;


export function getGallerysAll() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/gallery/album/all');
            console.log("gellary",response.data )
            dispatch(slice.actions.getgallerysSuccess(response.data.album));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOnegallery(id) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/gallery/album/one/' + id);
            dispatch(slice.actions.getonegallerySuccess(response.data.album));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postgallery(formData, toast, push, reset) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/gallery/album/add', formData, { headers: header });
            dispatch(slice.actions.postaddgallerySuccess(response.data));
            toast.success(response.data?.message)
            if (response.data.status == true) {
                reset()
                push('/dashboard/gallery/album')
            }
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function putgallery(id, formData, toast, push, reset) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put('/gallery/album/update/' + id, formData, { headers: header });
            dispatch(slice.actions.postaddgallerySuccess(response.data.album));
            toast.success(response.data?.message)
            if (response.data.status == true) {
                reset()
                push('/dashboard/gallery/album')
            }
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deletegallery(id, toast) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete('/gallery/album/delete/' + id, { headers: header });
            dispatch(slice.actions.deletegallerySuccess(response.data.status));
            toast.success(response.data?.message)
        } catch (error) {
            toast.error(error?.message)
            dispatch(slice.actions.hasError(error));
        }
    };
}