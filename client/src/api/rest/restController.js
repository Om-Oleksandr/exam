import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.post('getUser');
export const updateContest = data => http.post('updateContest', data);
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.post('setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = data => http.post('pay', data.formData);
export const changeMark = data => http.post('changeMark', data);

export const dataForContest = data => http.post('dataForContest', data);
export const cashOut = data => http.post('cashout', data);
export const updateUser = data => http.post('updateUser', data);

export const getPreviewChatSql = () => http.post('get-preview');
export const getSqlDialog = data => http.post('get-chat', data);
export const newSqlMessage = data => http.post('new-message', data);
export const changeChatFavoriteSql = data => http.post('favorite-sql', data);
export const changeChatBlockSql = data => http.post('black-list', data);
export const getCatalogListSql = data => http.post('get-catalogs', data);
export const addChatToCatalogSql = data =>
  http.post('add-new-chat-to-catalog', data);
export const createCatalogSql = data => http.post('create-catalog', data);
export const deleteCatalogSql = data => http.post('delete-catalog', data);
export const removeChatFromCatalogSql = data =>
  http.post('remove-chat-from-catalog', data);
export const changeCatalogNameSql = data =>
  http.post('update-name-natalog', data);

export const getCustomersContests = data =>
  http.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const getContestById = data =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
