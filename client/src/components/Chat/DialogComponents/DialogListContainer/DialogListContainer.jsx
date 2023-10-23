import React from 'react';
import { useSelector } from 'react-redux';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = props => {
  const { messagesPreview } = useSelector(state => state.chatStore);
  return <DialogList preview={messagesPreview} userId={props.userId} />;
};

export default DialogListContainer;
