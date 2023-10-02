import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import Error from '../../components/Error/Error';

const ContestPage = props => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const dispatch = useDispatch();
  useEffect(() => {
    const { params } = props.match;
    dispatch(getContestById({ contestId: params.id, page, limit }));
    return () => {
      dispatch(changeEditContest(false));
    };
  }, [dispatch, page, limit, props.match]);

  const { contestByIdStore, userStore, chatStore } = useSelector(
    state => state
  );
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;
  console.log(contestData);

  const mapOffers = elem => (
    <OfferBox
      data={elem}
      key={elem.id}
      needButtons={needButtons}
      setOfferStatus={setBuyerDecision}
      contestData={{ offers, ...contestData }}
      paginationData={{ page, limit }}
      handlePage={handlePage}
      date={new Date()}
    />
  );

  const handlePage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const needButtons = offerStatus => {
    const contestCreatorId = contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const setBuyerDecision = (creatorId, offerId, command) => {
    dispatch(clearSetOfferStatusError());
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    dispatch(setOfferStatus(obj));
  };

  const findConversationInfo = interlocutorId => {
    const { messagesPreview } = chatStore;
    const { id } = userStore.data;
    const participants = [id, interlocutorId];
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

  const goChat = () => {
    const { User } = contestData;
    dispatch(
      goToExpandedDialog({
        interlocutor: User,
        conversationData: findConversationInfo(User.id),
      })
    );
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page => page - 1);
    }
  };

  const handleNext = () => {
    if (offers.length <= limit) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const { role } = userStore.data;

  return (
    <div>
      {/* <Chat/> */}
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain
            getData={() => {
              const { params } = props.match;
              dispatch(getContestById({ contestId: params.id, page, limit }));
            }}
          />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => dispatch(changeContestViewMode(true))}
                className={cx(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => dispatch(changeContestViewMode(false))}
                className={cx(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </div>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <div
                className={cx(styles.offersContainer, {
                  [styles.customerOffers]: role === CONSTANTS.CUSTOMER,
                })}
              >
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      paginationData={{ page, limit }}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                {offers && offers.length === 0 ? (
                  <div className={styles.offers}>
                    {' '}
                    <span>There is no offers</span>
                  </div>
                ) : (
                  <div className={styles.offers}>{offers.map(mapOffers)}</div>
                )}

                {contestData.validOffers > limit && (
                  <div className={styles.buttonSection}>
                    <button
                      className={cx({
                        [styles.disabled]: page === 1,
                      })}
                      onClick={handlePrev}
                    >
                      {'<'}
                    </button>
                    <span>{page}</span>
                    <button
                      className={cx({
                        [styles.disabled]:
                          page ===
                          (contestData && contestData.validOffers % limit === 0
                            ? contestData.validOffers / limit
                            : Math.floor(contestData.validOffers / limit) + 1),
                      })}
                      onClick={handleNext}
                    >
                      {'>'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={contestData.validOffers}
          />
        </div>
      )}
    </div>
  );
};

export default ContestPage;
