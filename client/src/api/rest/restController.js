import httpClient from '../interceptor';

export const registerRequest = data => httpClient.post('auth/sign-up', data);
export const loginRequest = data => httpClient.post('auth/sign-in', data);

export const getUser = () => httpClient.get('getUser');
export const cashOut = data => httpClient.post('user/cashout', data);
export const updateUser = data => httpClient.post('user/updateUser', data);
export const payMent = data => httpClient.post('user/pay', data.formData);
export const changeMark = data => httpClient.post('user/changeMark', data);

export const updateContest = data =>
  httpClient.patch('contest/updateContest', data);
export const setNewOffer = data =>
  httpClient.post('contest/setNewOffer', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const setOfferStatus = data =>
  httpClient.patch('contest/setOfferStatus', data);
export const downloadContestFile = data =>
  httpClient.get(`contest/downloadFile/${data.fileName}`);

export const dataForContest = data =>
  httpClient.post('contest/dataForContest', data);

export const getCustomersContests = data =>
  httpClient.get('contest/getCustomersContests', {
    headers: {
      status: data.contestStatus,
      limit: data.limit,
      offset: data.offset,
    },
  });

export const getModeratorContests = params =>
  httpClient.get('contest/get-moderator-contests', {
    headers: { page: params.page, limit: params.limit },
  });

export const setModeratorDecision = data =>
  httpClient.patch('contest/set-moderator-decision', data);

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  httpClient.get('contest/getAllContests', {
    headers: {
      offset: offset,
      limit: limit,
      typeindex: typeIndex,
      contestid: contestId,
      industry: industry,
      awardsort: awardSort,
      ownentries: ownEntries,
    },
  });

export const getContestById = data =>
  httpClient.get('contest/getContestById', {
    headers: {
      contestId: data.contestId,
      page: data.page,
      limit: data.limit,
    },
  });

export const getPreviewChatSql = () => httpClient.get('chat/get-preview');
export const getSqlDialog = data =>
  httpClient.get('chat/get-chat', {
    headers: { interlocutorid: data.interlocutorId },
  });
export const newSqlMessage = data => httpClient.post('chat/new-message', data);

export const changeChatFavoriteSql = data =>
  httpClient.patch('chat/favorite-sql', data);

export const changeChatBlockSql = data =>
  httpClient.patch('chat/black-list', data);

export const getCatalogListSql = () => httpClient.get('chat/get-catalogs');

export const addChatToCatalogSql = data =>
  httpClient.patch('chat/add-new-chat-to-catalog', data);

export const createCatalogSql = data =>
  httpClient.post('chat/create-catalog', data);
export const deleteCatalogSql = data =>
  httpClient.delete('chat/delete-catalog', {
    data: { catalogId: data.catalogId },
  });
export const removeChatFromCatalogSql = data =>
  httpClient.patch('chat/remove-chat-from-catalog', data);
export const changeCatalogNameSql = data =>
  httpClient.patch('chat/update-name-natalog', data);
