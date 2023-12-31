import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  rejectedReducer,
  createExtraReducers,
  pendingReducer,
} from '../../utils/store';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
};

//---------- getContestById
export const getContestById = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  thunk: async payload => {
    const { data } = await restController.getContestById(payload);
    const { Offers } = data;
    delete data.Offers;
    return { contestData: data, offers: Offers };
  },
});

const getContestByIdExtraReducers = createExtraReducers({
  thunk: getContestById,
  pendingReducer: state => {
    state.isFetching = true;
    state.contestData = null;
    state.error = null;
    state.offers = [];
  },
  fulfilledReducer: (state, { payload: { contestData, offers } }) => {
    state.isFetching = false;
    state.contestData = contestData;
    state.error = null;
    state.offers = offers;
  },
  rejectedReducer,
});

//---------- addOffer
export const addOffer = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  thunk: async payload => {
    const { data } = await restController.setNewOffer(payload);
    return data;
  },
});

const addOfferExtraReducers = createExtraReducers({
  thunk: addOffer,
  fulfilledReducer: (state, { payload }) => {
    state.offers.unshift({ ...payload.result, User: payload.user });
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.addOfferError = payload;
  },
});

//---------- setOfferStatus
export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  thunk: async payload => {
    const { data } = await restController.setOfferStatus(payload);
    return data;
  },
});

const setOfferStatusExtraReducers = createExtraReducers({
  thunk: setOfferStatus,
  fulfilledReducer: (state, { payload }) => {
    state.offers.forEach(offer => {
      if (payload.buyerDecision === CONSTANTS.OFFER_STATUSES.WON) {
        offer.buyerDecision =
          payload.id === offer.id
            ? CONSTANTS.OFFER_STATUSES.WON
            : CONSTANTS.OFFER_STATUSES.REJECTED;
      } else if (payload.id === offer.id) {
        offer.buyerDecision = CONSTANTS.OFFER_STATUSES.REJECTED;
      }
    });
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.setOfferStatusError = payload;
  },
});

//---------- changeMark
export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  thunk: async payload => {
    const { data } = await restController.changeMark(payload);
    return { data, offerId: payload.offerId, mark: payload.mark };
  },
});

const changeMarkExtraReducers = createExtraReducers({
  thunk: changeMark,
  fulfilledReducer: (state, { payload: { data, offerId, mark } }) => {
    state.offers.forEach(offer => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === offerId) {
        offer.mark = mark;
      }
    });
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.changeMarkError = payload;
  },
});

export const setModeratorDecision = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setModeratorDecision`,
  thunk: async status => {
    const { data } = await restController.setModeratorDecision(status);
    return data;
  },
});

const reducers = {
  updateStoreAfterUpdateContest: (state, { payload }) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
  changeContestViewMode: (state, { payload }) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  changeEditContest: (state, { payload }) => {
    state.isEditContest = payload;
  },
  clearAddOfferError: state => {
    state.addOfferError = null;
  },
  clearSetOfferStatusError: state => {
    state.setOfferStatusError = null;
  },
  clearChangeMarkError: state => {
    state.changeMarkError = null;
  },
  changeShowImage: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
  changeValidOffers: (state, { payload }) => {
    state.contestData.validOffers = payload - 1;
  },
};

const extraReducers = builder => {
  getContestByIdExtraReducers(builder);
  addOfferExtraReducers(builder);
  setOfferStatusExtraReducers(builder);
  changeMarkExtraReducers(builder);

  builder.addCase(setModeratorDecision.pending, pendingReducer);
  builder.addCase(setModeratorDecision.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = [...payload.contestOffers];
  });
  builder.addCase(setModeratorDecision.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.offers = [];
  });
};

const contestByIdSlice = createSlice({
  name: CONTEST_BY_ID_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestByIdSlice;

export const {
  updateStoreAfterUpdateContest,
  changeContestViewMode,
  changeEditContest,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
  changeValidOffers,
} = actions;

export default reducer;
