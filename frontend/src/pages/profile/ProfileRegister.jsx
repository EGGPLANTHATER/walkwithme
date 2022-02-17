import { memo, useRef, useContext, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './ProfileRegister.module.css';
import FileInput from '../../components/Input/ImageFileInput';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/api';
import AddressModal from '../../components/Modal/AddressModal';

const ProfileRegister = memo(() => {
  const navigate = useNavigate();
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [imgURL, setImgURL] = useState(null);
  const [imgPath, setImgPath] = useState(null);
  const [state, dispatch] = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // 주소 검색
  const modalHandler = () => {
    setIsOpen((curr) => !curr);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    setLoading(false);
  }, [isOpen]);

  const handleComplete = (data) => {
    // bname = 법정동/법정리 이름
    // bname1 = 법정리의 읍/면 이름
    if (data.bname1 === '') areaRef.current.value = data.bname;
    else areaRef.current.value = data.bname1;
  };

  const reader = new FileReader();

  const onFileChange = async (e) => {
    reader.onload = (e) => {
      setImgURL(e.currentTarget.result);
    };
    const imgFile = e.target.files[0];
    reader.readAsDataURL(imgFile);

    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    const response = await apiClient.post('/api/auth/profile-image', formData);
    const { profileImagePath } = response.data;

    setImgPath(profileImagePath);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!areaRef.current.value) return alert('거주지역을 검색해주세요!');

    const { value: nickname } = nameRef.current;
    const { value: gender } = genderRef.current;
    const { value: birthYear } = ageRef.current;
    const { value: area } = areaRef.current;

    const data = {
      profileImagePath: imgPath,
      nickname,
      gender,
      birthYear,
      area,
    };

    const response = await apiClient.post(
      `/api/auth/${state.user._id}/profile`,
      data
    );

    dispatch({ type: CHANGE_USER_INFO, payload: response.data });
    navigate('/');
  };

  if (loading) {
    return <div>로딩 중</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <h2 className={styles.title}>
            처음 오셨군요? 기본 정보를 입력해주세요!
          </h2>
          <FileInput onFileChange={onFileChange} imgURL={imgURL} />
          <Input
            ref={nameRef}
            name='nickname'
            placeholder='닉네임'
            className={styles.input}
            required
          />
          <Dropdown
            ref={genderRef}
            className={styles.input}
            type='gender'
            width='50rem'
            height='6rem'
            required
          />
          <Input
            ref={ageRef}
            name='birthyear'
            placeholder='태어난 연도'
            type='number'
            required
          />
          <div className={styles.areaBox}>
            <input
              name='area'
              className={styles['area-name']}
              placeholder='거주지역을 검색해주세요.'
              ref={areaRef}
              disabled
            />
            <Button
              type='button'
              width='9rem'
              height='6rem'
              ftsize='1.4rem'
              text='검색하기'
              onClick={modalHandler}
            />
          </div>
          <Button text='등록하기' />
        </form>
      </div>
      {isOpen && (
        <AddressModal
          onClick={modalHandler}
          onComplete={handleComplete}
          onClose={modalHandler}
        />
      )}
    </>
  );
});

export default ProfileRegister;
