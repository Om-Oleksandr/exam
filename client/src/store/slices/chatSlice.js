import { createSlice } from '@reduxjs/toolkit';
import { isEqual, remove } from 'lodash';
import * as restController from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import {
  decorateAsyncThunk,
  createExtraReducers,
  rejectedReducer,
} from '../../utils/store';

const CHAT_SLICE_NAME = 'chat';

const initialState = {
  isFetching: true,
  addChatId: null,
  isShowCatalogCreation: false,
  currentCatalog: null,
  chatData: null,
  messages: [],
  error: null,
  isExpanded: false,
  interlocutor: null,
  messagesPreview: [],
  isShow: false,
  chatMode: CONSTANTS.NORMAL_PREVIEW_CHAT_MODE,
  catalogList: [],
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  catalogCreationMode: CONSTANTS.ADD_CHAT_TO_OLD_CATALOG,
};

//---------- getPreviewChat

export const getPreviewChatSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getPreviewChatSql`,
  thunk: async () => {
    const { data } = await restController.getPreviewChatSql();
    return data;
  },
});

const getPreviewChatSqlExtraReducers = createExtraReducers({
  thunk: getPreviewChatSql,
  fulfilledReducer: (state, { payload }) => {
    state.messagesPreview = payload.conversations;
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
    state.messagesPreview = [];
  },
});

//---------- getDialogMessages

export const getDialogMessagesSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getDialogMessagesSql`,
  thunk: async payload => {
    const { data } = await restController.getSqlDialog(payload);
    return data;
  },
});

const getDialogMessagesSqlExtraReducers = createExtraReducers({
  thunk: getDialogMessagesSql,
  fulfilledReducer: (state, { payload }) => {
    state.messages = payload.messages;
    state.interlocutor = payload.interlocutor;
  },
  rejectedReducer: (state, { payload }) => {
    state.messages = [];
    state.interlocutor = null;
    state.error = payload;
  },
});

//---------- sendMessage

export const sendSqlMessage = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/sendSqlMessage`,
  thunk: async payload => {
    const { data } = await restController.newSqlMessage(payload);
    return data;
  },
});

const sendSqlMessageExtraReducers = createExtraReducers({
  thunk: sendSqlMessage,
  fulfilledReducer: (state, { payload }) => {
    const { messagesPreview } = state;
    let isNew = true;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.newMessage.participants)) {
        preview.text = payload.newMessage.body;
        preview.sender = payload.newMessage.sender;
        preview.createAt = payload.newMessage.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(payload.preview);
    }
    const chatData = {
      _id: payload.preview.id,
      participants: payload.preview.participants,
      favoriteList: payload.preview.favoriteList,
      blackList: payload.preview.blackList,
    };
    state.chatData = { ...state.chatData, ...chatData };
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, payload.newMessage];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- changeChatFavorite

export const changeChatFavoriteSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatFavoriteSql`,
  thunk: async payload => {
    const { data } = await restController.changeChatFavoriteSql(payload);
    return data;
  },
});

const changeChatFavoriteExtraReducersSql = createExtraReducers({
  thunk: changeChatFavoriteSql,
  fulfilledReducer: (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.chat.participants))
        preview.favoriteList = payload.chat.favoriteList;
    });
    state.chatData = payload.chat;
    state.messagesPreview = messagesPreview;
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- changeChatBlock

export const changeChatBlockSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatBlockSql`,
  thunk: async payload => {
    const { data } = await restController.changeChatBlockSql(payload);
    return data;
  },
});

const changeChatBlockExtraReducersSql = createExtraReducers({
  thunk: changeChatBlockSql,
  fulfilledReducer: (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.chat.participants))
        preview.blackList = payload.chat.blackList;
    });
    state.chatData = payload.chat;
    state.messagesPreview = messagesPreview;
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- getCatalogList

export const getCatalogListSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getCatalogListSql`,
  thunk: async () => {
    const { data } = await restController.getCatalogListSql();
    return data;
  },
});

const getCatalogListExtraReducersSql = createExtraReducers({
  thunk: getCatalogListSql,
  fulfilledReducer: (state, { payload }) => {
    state.isFetching = false;
    state.catalogList = [...payload.catalogs];
  },
  rejectedReducer,
});

//---------- addChatToCatalog

export const addChatToCatalogSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/addChatToCatalogSql`,
  thunk: async payload => {
    const { data } = await restController.addChatToCatalogSql(payload);
    return data;
  },
});

const addChatToCatalogExtraReducersSql = createExtraReducers({
  thunk: addChatToCatalogSql,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].id === payload.id) {
        catalogList[i].conversations = payload.conversations;
        break;
      }
    }
    state.isShowCatalogCreation = false;
    state.catalogList = [...catalogList];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
    state.isShowCatalogCreation = false;
  },
});

//---------- createCatalog

export const createCatalogSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/createCatalogSql`,
  thunk: async payload => {
    const { data } = await restController.createCatalogSql(payload);
    return data;
  },
});

const createCatalogExtraReducersSql = createExtraReducers({
  thunk: createCatalogSql,
  fulfilledReducer: (state, { payload }) => {
    state.catalogList = [...state.catalogList, payload.catalog];
    state.isShowCatalogCreation = false;
  },
  rejectedReducer: (state, { payload }) => {
    state.isShowCatalogCreation = false;
    state.error = payload;
  },
});

//---------- deleteCatalog

export const deleteCatalogSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/deleteCatalogSql`,
  thunk: async payload => {
    await restController.deleteCatalogSql(payload);
    return payload;
  },
});

const deleteCatalogExtraReducersSql = createExtraReducers({
  thunk: deleteCatalogSql,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    const newCatalogList = remove(
      catalogList,
      catalog => payload.catalogId !== catalog.id
    );
    state.catalogList = [...newCatalogList];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- removeChatFromCatalog

export const removeChatFromCatalogSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/removeChatFromCatalogSql`,
  thunk: async payload => {
    const { data } = await restController.removeChatFromCatalogSql(payload);
    return data;
  },
});

const removeChatFromCatalogExtraReducersSql = createExtraReducers({
  thunk: removeChatFromCatalogSql,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].id === payload.id) {
        catalogList[i].conversations = payload.conversations;
        break;
      }
    }
    state.currentCatalog = payload;
    state.catalogList = [...catalogList];
  },
  rejectedReducer: (state, { payload }) => {
    state.error = payload;
  },
});

//---------- changeCatalogName

export const changeCatalogNameSql = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeCatalogNameSql`,
  thunk: async payload => {
    const { data } = await restController.changeCatalogNameSql(payload);
    return data;
  },
});

const changeCatalogNameExtraReducersSql = createExtraReducers({
  thunk: changeCatalogNameSql,
  fulfilledReducer: (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i].id === payload.id) {
        catalogList[i].catalogName = payload.catalogName;
        break;
      }
    }
    state.catalogList = [...catalogList];
    state.currentCatalog = payload;
    state.isRenameCatalog = false;
  },
  rejectedReducer: state => {
    state.isRenameCatalog = false;
  },
});

//-------------------------------------------------------

const reducers = {
  changeBlockStatusInStore: (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  },

  addMessage: (state, { payload }) => {
    const { newMessage, preview } = payload;
    const { messagesPreview } = state;
    let isNew = true;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, newMessage.participants)) {
        preview.text = newMessage.body;
        preview.sender = newMessage.sender;
        preview.createAt = newMessage.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(preview);
    }
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, payload.newMessage];
  },

  backToDialogList: state => {
    state.isExpanded = false;
  },

  goToExpandedDialog: (state, { payload }) => {
    state.interlocutor = { ...state.interlocutor, ...payload.interlocutor };
    state.chatData = payload.conversationData;
    state.isShow = true;
    state.isExpanded = true;
    state.messages = [];
  },

  clearMessageList: state => {
    state.messages = [];
  },

  changeChatShow: state => {
    state.isShowCatalogCreation = false;
    state.isShow = !state.isShow;
  },

  setPreviewChatMode: (state, { payload }) => {
    state.chatMode = payload;
  },

  changeShowModeCatalog: (state, { payload }) => {
    state.currentCatalog = { ...state.currentCatalog, ...payload };
    state.isShowChatsInCatalog = !state.isShowChatsInCatalog;
    state.isRenameCatalog = false;
  },

  changeTypeOfChatAdding: (state, { payload }) => {
    state.catalogCreationMode = payload;
  },

  changeShowAddChatToCatalogMenu: (state, { payload }) => {
    state.addChatId = payload;
    state.isShowCatalogCreation = !state.isShowCatalogCreation;
  },

  changeRenameCatalogMode: state => {
    state.isRenameCatalog = !state.isRenameCatalog;
  },

  clearChatError: state => {
    state.error = null;
  },
};

const extraReducers = builder => {
  sendSqlMessageExtraReducers(builder);
  getDialogMessagesSqlExtraReducers(builder);
  getPreviewChatSqlExtraReducers(builder);
  changeChatBlockExtraReducersSql(builder);
  changeChatFavoriteExtraReducersSql(builder);
  createCatalogExtraReducersSql(builder);
  getCatalogListExtraReducersSql(builder); 
  addChatToCatalogExtraReducersSql(builder); 
  deleteCatalogExtraReducersSql(builder); 
  removeChatFromCatalogExtraReducersSql(builder); 
  changeCatalogNameExtraReducersSql(builder);
};

const chatSlice = createSlice({
  name: CHAT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = chatSlice;

export const {
  changeBlockStatusInStore,
  addMessage,
  backToDialogList,
  goToExpandedDialog,
  clearMessageList,
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  changeRenameCatalogMode,
  clearChatError,
} = actions;

export default reducer;
