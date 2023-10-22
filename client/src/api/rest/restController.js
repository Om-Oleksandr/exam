import httpClient from '../interceptor';

export const registerRequest = data => httpClient.post('auth/sign-up', data);
export const loginRequest = data => httpClient.post('auth/sign-in', data);

export const getUser = () => httpClient.post('getUser');
export const updateContest = data => httpClient.post('updateContest', data);
export const setNewOffer = data =>
  httpClient.post('setNewOffer', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const setOfferStatus = data => httpClient.post('setOfferStatus', data);
export const downloadContestFile = data =>
  httpClient.get(`downloadFile/${data.fileName}`);
export const payMent = data => httpClient.post('pay', data.formData);
export const changeMark = data => httpClient.post('changeMark', data);
export const getPreviewChat = () => httpClient.post('getPreview');
export const getDialog = data => httpClient.post('getChat', data);
export const dataForContest = data => httpClient.post('dataForContest', data);
export const cashOut = data => httpClient.post('cashout', data);
export const updateUser = data =>
  httpClient.post('updateUser', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const newMessage = data => httpClient.post('newMessage', data);
export const changeChatFavorite = data => httpClient.post('favorite', data);
export const changeChatBlock = data => httpClient.post('blackList', data);
export const getCatalogList = data => httpClient.post('getCatalogs', data);
export const addChatToCatalog = data => httpClient.post('addNewChatToCatalog', data);
export const createCatalog = data => httpClient.post('createCatalog', data);
export const deleteCatalog = data => httpClient.post('deleteCatalog', data);
export const removeChatFromCatalog = data =>
  httpClient.post('removeChatFromCatalog', data);
export const changeCatalogName = data => httpClient.post('updateNameCatalog', data);
export const getCustomersContests = data =>
  httpClient.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getModeratorContests = params =>
  httpClient.get('get-moderator-contests', {
    headers: { page: params.page, limit: params.limit },
  });

export const setModeratorDecision = data =>
  httpClient.post('set-moderator-decision', data);

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  httpClient.post('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const getContestById = data =>
  httpClient.get('getContestById', {
    headers: {
      contestId: data.contestId,
      page: data.page,
      limit: data.limit
    },
  });
