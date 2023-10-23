const express = require('express');
const sqlChatController = require('../controllers/sqlChatController');

const chatRouter = express.Router();
chatRouter.post('/new-message', sqlChatController.addMessage);

chatRouter.get('/get-chat', sqlChatController.getChat);

chatRouter.get('/get-preview', sqlChatController.getPreview);

chatRouter.patch('/black-list', sqlChatController.blackList);

chatRouter.patch('/favorite-sql', sqlChatController.favoriteChat);

chatRouter.post('/create-catalog', sqlChatController.createCatalog);

chatRouter.patch('/update-name-natalog', sqlChatController.updateNameCatalog);

chatRouter.patch(
  '/add-new-chat-to-catalog',
  sqlChatController.addNewChatToCatalog,
);

chatRouter.patch(
  '/remove-chat-from-catalog',
  sqlChatController.removeChatFromCatalog,
);

chatRouter.delete('/delete-catalog', sqlChatController.deleteCatalog);

chatRouter.get('/get-catalogs', sqlChatController.getCatalogs);

module.exports = chatRouter;
