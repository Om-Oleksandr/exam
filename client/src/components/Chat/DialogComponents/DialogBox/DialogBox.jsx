import React from 'react';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';
import { useDispatch } from 'react-redux';
import {
  changeChatBlockSql,
  changeChatFavoriteSql,
} from '../../../../store/slices/chatSlice';

const DialogBox = props => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const { favoriteList, participants, blackList, id, text, createAt } =
    chatPreview;
  const dispatch = useDispatch();

  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];

  const changeFavorite = (data, event) => {
    dispatch(changeChatFavoriteSql(data));
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    dispatch(changeChatBlockSql(data));
    event.stopPropagation();
  };
  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            id,
            blackList,
            favoriteList,
          },
        })
      }
    >
      <img
        src={
          interlocutor.avatar === null
            ? CONSTANTS.ANONYM_IMAGE_PATH
            : `${CONSTANTS.publicURL}${interlocutor.avatar}`
        }
        alt='user'
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>
          <i
            onClick={event =>
              changeFavorite(
                {
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event
              )
            }
            className={classNames({
              'far fa-heart': !isFavorite,
              'fas fa-heart': isFavorite,
            })}
          />
          <i
            onClick={event =>
              changeBlackList(
                {
                  participants,
                  blackListFlag: !isBlocked,
                },
                event
              )
            }
            className={classNames({
              'fas fa-user-lock': !isBlocked,
              'fas fa-unlock': isBlocked,
            })}
          />
          <i
            onClick={event => catalogOperation(event, id)}
            className={classNames({
              'far fa-plus-square': chatMode !== CONSTANTS.CHAT_MODES.CATALOG,
              'fas fa-minus-circle': chatMode === CONSTANTS.CHAT_MODES.CATALOG,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
