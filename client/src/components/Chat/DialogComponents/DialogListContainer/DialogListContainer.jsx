import React from 'react';
import { useSelector } from 'react-redux';
import DialogList from '../DialogList/DialogList';

const DialogListContainer = () => {
  const {messagesPreview, userId} = useSelector(state=>state.chatStore)
  return <DialogList preview={messagesPreview} userId={userId} />;
};


export default DialogListContainer;