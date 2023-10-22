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

export const dataForContest = data => httpClient.post('dataForContest', data);
export const cashOut = data => httpClient.post('cashout', data);
export const updateUser = data => httpClient.post('updateUser', data);

export const getPreviewChatSql = () => httpClient.post('get-preview');
export const getSqlDialog = data => httpClient.post('get-chat', data);
export const newSqlMessage = data => httpClient.post('new-message', data);
export const changeChatFavoriteSql = data => httpClient.post('favorite-sql', data);
export const changeChatBlockSql = data => httpClient.post('black-list', data);
export const getCatalogListSql = data => httpClient.post('get-catalogs', data);
export const addChatToCatalogSql = data =>
  httpClient.post('add-new-chat-to-catalog', data);
export const createCatalogSql = data => httpClient.post('create-catalog', data);
export const deleteCatalogSql = data => httpClient.post('delete-catalog', data);
export const removeChatFromCatalogSql = data =>
  httpClient.post('remove-chat-from-catalog', data);
export const changeCatalogNameSql = data =>
  httpClient.post('update-name-natalog', data);

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
