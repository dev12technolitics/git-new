// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  
  banner: {
    view: path(ROOTS_DASHBOARD, '/banner'),
    addbanner: path(ROOTS_DASHBOARD, '/banner/add'),
  },

  testimonials: {
    view: path(ROOTS_DASHBOARD, '/testimonials'),
    addtestimonials: path(ROOTS_DASHBOARD, '/testimonials/add'),
  },

  blogmanagement: {
    view: path(ROOTS_DASHBOARD, '/blogmanagement'),
    addblogs: path(ROOTS_DASHBOARD, '/blogmanagement/add'),
  },

  notification: {
    view: path(ROOTS_DASHBOARD, '/notification'),
    addnotification: path(ROOTS_DASHBOARD, '/notification/add'),
  },

  members: {
    view: path(ROOTS_DASHBOARD, '/members'),
    add: path(ROOTS_DASHBOARD, '/members/add'),
  },

  groups: {
    view: path(ROOTS_DASHBOARD, '/groups'),
    add: path(ROOTS_DASHBOARD, '/groups/add'),
  },

  album: {
    view: path(ROOTS_DASHBOARD, '/gallery/album'),
    add: path(ROOTS_DASHBOARD, '/gallery/album/add'),
  },

  video: {
    view: path(ROOTS_DASHBOARD, '/gallery/video'),
    add: path(ROOTS_DASHBOARD, '/gallery/video/add'),
  },

  feedback: {
    view: path(ROOTS_DASHBOARD, '/feedback'),
    addfeedback: path(ROOTS_DASHBOARD, '/feedback/add')
  },

  shop: {
    view: path(ROOTS_DASHBOARD, '/shop'),
    add: path(ROOTS_DASHBOARD, '/shop/add')
  },

  membershipenquiry: {
    view: path(ROOTS_DASHBOARD, '/membershipenquiry'),
    add: path(ROOTS_DASHBOARD, '/membershipenquiry/add')
  },

  association: {
    view: path(ROOTS_DASHBOARD, '/association'),
    add: path(ROOTS_DASHBOARD, '/association/add')
  },

  posts: {
    view: path(ROOTS_DASHBOARD, '/posts'),
    add: path(ROOTS_DASHBOARD, '/posts/add'),
  },

  leadership: {
    view: path(ROOTS_DASHBOARD, '/leadership'),
    add: path(ROOTS_DASHBOARD, '/leadership/add'),
  },

  poll: {
    view: path(ROOTS_DASHBOARD, '/poll'),
    add: path(ROOTS_DASHBOARD, '/poll/add'),
  },

  designationnar: {
    view: path(ROOTS_DASHBOARD, '/designationnar'),
    add: path(ROOTS_DASHBOARD, '/designationnar/add'),
  },

  designation: {
    view: path(ROOTS_DASHBOARD, '/designation'),
    add: path(ROOTS_DASHBOARD, '/designation/add'),
  },

  city: {
    view: path(ROOTS_DASHBOARD, '/city'),
    add: path(ROOTS_DASHBOARD, '/city/add'),
  },

  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },

  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },

  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },

  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },

  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },

  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },

  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },

};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
