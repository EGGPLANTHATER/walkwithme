import React from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Explore from './icons/explore';
import styles from './profile.module.css';

const MyProfile = (props) => {
  let { nickname, birthYear, area, profileImgURL } = props.user;
  if (!nickname) nickname = '알수 없음';
  if (!birthYear) birthYear = 'YYYY';
  if (!area) area = '알수 없음';
  if (!profileImgURL) profileImgURL = '';
  // console.log('props.user: ', props.user);
  return (
    <>
      <h2 className={styles.title}>나의 정보</h2>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <Avatar width='8rem' height='8rem' src={profileImgURL} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            <h3>{nickname}</h3>
            <p className={styles.date}>{birthYear}년생</p>
          </div>
          <div className={styles.areaWrapper}>
            <Explore />
            <h3 className={styles.area}>{area}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
