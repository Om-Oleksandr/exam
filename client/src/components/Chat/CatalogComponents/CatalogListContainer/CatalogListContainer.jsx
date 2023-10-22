import React from 'react';
import { connect } from 'react-redux';
import {
  getCatalogListSql,
  removeChatFromCatalogSql,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

class CatalogListContainer extends React.Component {
  componentDidMount () {
    this.props.getCatalogListSql();
  }

  removeChatFromCatalog = (event, chatId) => {
    const { id } = this.props.chatStore.currentCatalog;
    this.props.removeChatFromCatalogSql({ chatId, catalogId: id });
    event.stopPropagation();
  };
  
  getDialogsPreview = () => {
    const { messagesPreview, currentCatalog } = this.props.chatStore;
    const { conversations } = currentCatalog;
    const dialogsInCatalog = [];
    if (messagesPreview && conversations) {
      for (let i = 0; i < messagesPreview.length; i++) {
        for (let j = 0; j < conversations.length; j++) {
          if (conversations[j] === messagesPreview[i].id) {
            dialogsInCatalog.push(messagesPreview[i]);
          }
        }
      }
    }
    return dialogsInCatalog;
  };

  render () {
    const { catalogList, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;
    return (
      <>
        {isShowChatsInCatalog ? (
          <DialogList
            userId={id}
            preview={this.getDialogsPreview()}
            removeChat={this.removeChatFromCatalog}
          />
        ) : (
          <CatalogList catalogList={catalogList} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = dispatch => ({
  getCatalogListSql: () => dispatch(getCatalogListSql()),
  removeChatFromCatalogSql: data => dispatch(removeChatFromCatalogSql(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
