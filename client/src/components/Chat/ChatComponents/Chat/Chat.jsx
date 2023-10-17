import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChatSql,
} from '../../../../store/slices/chatSlice';
import { chatController } from '../../../../api/ws/socketController';
import CONSTANTS from '../../../../constants';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../../../ChatError/ChatError';

class Chat extends React.Component {
  componentDidMount () {
    chatController.subscribeChat(this.props.userStore.data.id);
    this.props.getPreviewChatSql();
  }

  componentWillUnmount () {
    chatController.unsubscribeChat(this.props.userStore.data.id);
  }

  renderDialogList = () => {
    const { setChatPreviewMode } = this.props;
    const { chatMode, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    const {
      CHAT_MODES: {
        NORMAL,
        FAVORITE,
        BLOCKED,
        CATALOG,
      },
    } = CONSTANTS;
    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt='logo' />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => setChatPreviewMode(NORMAL)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === NORMAL,
              })}
            >
              Normal
            </span>
            <span
              onClick={() => setChatPreviewMode(FAVORITE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === FAVORITE,
              })}
            >
              Favorite
            </span>
            <span
              onClick={() => setChatPreviewMode(BLOCKED)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === BLOCKED,
              })}
            >
              Blocked
            </span>
            <span
              onClick={() => setChatPreviewMode(CATALOG)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CATALOG,
              })}
            >
              Catalog
            </span>
          </div>
        )}
        {chatMode === CATALOG ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </div>
    );
  };

  render () {
    const { isExpanded, isShow, isShowCatalogCreation, error } =
      this.props.chatStore;
    const { id } = this.props.userStore.data;
    const { changeShow, getPreviewChatSql } = this.props;
    return (
      <div
        className={classNames(styles.chatContainer, {
          [styles.showChat]: isShow,
        })}
      >
        {error && <ChatError getData={getPreviewChatSql} />}
        {isShowCatalogCreation && <CatalogCreation />}
        {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
        <div className={styles.toggleChat} onClick={() => changeShow()}>
          {isShow ? 'Hide Chat' : 'Show Chat'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = dispatch => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: mode => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChatSql: () => dispatch(getPreviewChatSql()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
