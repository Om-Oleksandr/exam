import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  changeMark,
  clearChangeMarkError,
  changeShowImage,
  changeValidOffers,
  getContestById,
} from '../../store/slices/contestByIdSlice';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import { setModeratorDecision } from '../../store/slices/contestByIdSlice';

const OfferBox = props => {
  const findConversationInfo = () => {
    const { messagesPreview, id } = props;
    const participants = [id, props.data.User.id];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const moderDecision = ({ target }) => {
    props.setValidOffers(props.contestData.validOffers);
    const {
      paginationData: { limit, page },
      handlePage,
    } = props;

    const updateInfo = {
      id: props.data.id,
      contestId: props.contestData.id,
      status: target.value,
      limit,
      page: contestData.offers.length === 1 && page !== 1 ? page - 1 : page,
    };
    props.setModeratorDecision(updateInfo).then(() => {
      if (contestData.offers.length === 1 && page !== 1) {
        handlePage();
      }
    });
  };

  const changeMark = value => {
    const { page, limit } = props.paginationData;
    props.clearError();
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
    // .then(() =>
    //   props.getContestById({ contestId: props.contestData.id, page, limit })
    // );
  };

  const offerStatus = () => {
    const { status } = props.data;
    if (status === CONSTANTS.OFFER_STATUSES.REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }
    if (status === CONSTANTS.OFFER_STATUSES.WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }
    return null;
  };

  const goChat = () => {
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo(),
    });
  };

  const { data, role, id, contestData } = props;
  const { avatar, firstName, lastName, email, rating } = props.data.User;
  const offerRating = props.data.Rating;
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar === null
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${avatar}`
              }
              alt='user'
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt='star'
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt='star'
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt='star-outline'
                />
              }
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestData.contestType === CONSTANTS.CONTEST_TYPES.LOGO ? (
            <img
              onClick={() =>
                props.changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.publicURL}${data.fileName}`}
              alt='logo'
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
          {data.User.id !== id && role !== CONSTANTS.ROLES.MODERATOR && (
            <Rating
              initialRating={
                offerRating === null && props.data.mark !== null
                  ? props.data.mark
                  : offerRating.mark
              }
              readonly={
                offerRating === null && props.data.hasOwnProperty('mark') === false
                  ? false
                  : (props.data.mark || offerRating.mark) > 0
              }
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt='star'
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt='star'
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt='star'
                />
              }
              onClick={changeMark}
              placeholderRating={data.mark}
            />
          )}
        </div>
        {role !== CONSTANTS.ROLES.CREATOR &&
          role !== CONSTANTS.ROLES.MODERATOR && (
            <i onClick={goChat} className='fas fa-comments' />
          )}
        {role === CONSTANTS.ROLES.MODERATOR && (
          <div>
            <button
              onClick={moderDecision}
              value={CONSTANTS.APPROVE_STATUSES.APPROVED}
            >
              Approve
            </button>
            <button
              onClick={moderDecision}
              value={CONSTANTS.APPROVE_STATUSES.REJECTED}
            >
              Reject
            </button>
          </div>
        )}
      </div>
      {props.needButtons(data.buyerDecision) && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeMark: data => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: data => dispatch(goToExpandedDialog(data)),
  changeShowImage: data => dispatch(changeShowImage(data)),
  setModeratorDecision: data => dispatch(setModeratorDecision(data)),
  setValidOffers: data => dispatch(changeValidOffers(data)),
  getContestById: data => dispatch(getContestById(data)),
});

const mapStateToProps = state => {
  const { changeMarkError } = state.contestByIdStore;
  const { id, role } = state.userStore.data;
  const { messagesPreview } = state.chatStore;
  return {
    changeMarkError,
    id,
    role,
    messagesPreview,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBox)
);
