import { combineReducers } from "redux";

// import reducers
import { userLoginReducer } from './userReducers';

import {
    blogListReducer,
    blogCreateReducer,
    blogDeleteReducer,
    blogDetailsReducer,
    blogUpdateReducer,
} from './blogReducers';

import {
    imageListReducer,
    imageCreateReducer,
    imageDeleteReducer,
    imageDetailsReducer,
    imageUpdateReducer,
} from './imageReducers';

export default combineReducers({
    userLogin: userLoginReducer,

    blogList: blogListReducer,
    blogCreate: blogCreateReducer,
    blogUpdate: blogUpdateReducer,
    blogDetails: blogDetailsReducer,
    blogDelete: blogDeleteReducer,

    imageList: imageListReducer,
    imageCreate: imageCreateReducer,
    imageUpdate: imageUpdateReducer,
    imageDetails: imageDetailsReducer,
    imageDelete: imageDeleteReducer,
});