const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3000;
const CONSTANTS = {
  ROLES: {
    CUSTOMER: 'customer',
    CREATOR: 'creator',
  },
  CONTEST_STATUSES: {
    ACTIVE: 'active',
    FINISHED: 'finished',
    PENDING: 'pending',
  },
  CONTEST_TYPES: {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline',
  },
  OFFER_STATUSES: {
    REJECTED: 'rejected',
    WON: 'won',
    PENDING: 'pending',
  },
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  AUTH_MODE: {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
  },
  HEADER_ANIMATION_TEXT: [
    'a Company',
    'a Brand',
    'a Website',
    'a Service',
    'a Book',
    'a Business',
    'an App',
    'a Product',
    'a Startup',
  ],
  FooterItems: [
    {
      title: 'SQUADHELP',
      items: ['About', 'Contact', 'How It Works?', 'Testimonials', 'Our Work'],
    },
    {
      title: 'RESOURCES',
      items: [
        'How It Works',
        'Become a Creative',
        'Business Name Generator',
        'Discussion Forum',
        'Blog',
        'Download eBook',
        'Pricing',
        'Help & FAQs',
      ],
    },
    {
      title: 'OUR SERVICES',
      items: [
        'Naming',
        'Logo Design',
        'Taglines',
        'Premium Names For Sale',
        'Creative Owned Names For Sale',
        'Audience Testing',
        'Trademark Research & Filling',
        'Managed Agency Service',
      ],
    },
    {
      title: 'LEGAL',
      items: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
    },
  ],
};

export default CONSTANTS;
