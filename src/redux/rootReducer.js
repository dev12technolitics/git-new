import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import bannerReducer from './slices/banner';
import notificationReducer from './slices/notification';
import testimonialReducer from './slices/testimonial';
import designationReducer from './slices/designation'
import designationnarReducer from './slices/designationnar'
import membersReducer from './slices/members'
import groupsReducer from './slices/groups'
import postsReducer from './slices/posts'
import galleryReducer from './slices/gallery';
import videosReducer from './slices/video';
import feedbackReducer from './slices/feedback';
import shopReducer from './slices/shop';
import membershipenquiryReducer from './slices/membershipenquiry';
import associationReducer from './slices/association';
import leadershipReducer from './slices/leadership';
import pollReducer from './slices/poll';
import cityReducer from './slices/city';
// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  notification: notificationReducer,
  testimonial: testimonialReducer, 
  product: productReducer,

  banner: bannerReducer,
  designationnar: designationReducer, 
  designation: designationnarReducer, 
  feedback: feedbackReducer,
  member: membersReducer,
  groups: groupsReducer,
  posts: postsReducer,
  gallery: galleryReducer, 
  video:videosReducer,
  shop:shopReducer,
  membershipenquiry:membershipenquiryReducer,
  association:associationReducer,
  leadership:leadershipReducer,
  poll : pollReducer,
  city :cityReducer,
});

export { rootPersistConfig, rootReducer };
