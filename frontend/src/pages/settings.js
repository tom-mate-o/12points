//settings.js

import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';
import showNotifications from '../components/showNotifications/showNotificationsToastify';
import updateUserInDatabase from '../utils/updateUserInDatabase';

//Styled Components

import { SubTitle } from '../styledComponents/subTitle';
import { MainContainer } from '../styledComponents/mainContainer';
import { ProfileInfoGrid } from '../styledComponents/profileInfoGrid';

import { InputField } from '../styledComponents/inputField';
import { Boxtitle } from '../styledComponents/boxtitle';
import { WideButton } from '../styledComponents/wideButton';
import { birbImages } from '../assets/birbs/birbsimgs';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

export default function Settings({ handleLogout }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [value, setValue] = React.useState(0);

  function handleClickLogoutButton() {
    handleLogout();
    //navigate to login page
  }

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === decodedToken.id);
  const avatarUrl = user ? user.avatarUrl : null;
  const username = user ? user.username : null;

  const newUsername = useRef();
  const password1 = useRef();
  const password2 = useRef();

  function saveSettings(event) {
    event.preventDefault();

    if (password1.current.value !== password2.current.value) {
      showNotifications('Passwords do not match!', 'error');
      return;
    }

    const formData = new FormData();

    formData.append('newUsername', newUsername.current.value);
    formData.append('newPassword', password1.current.value);
    // formData.append('theme', value);
    // formData.append('notificationTime', notificationTime.current.value);
    formData.append('userId', decodedToken.id);

    updateUserInDatabase(formData);
  }

  return (
    <div>
      <div className="title">
        <p>Personal</p>
        <div className="title__lastRow">
          <p>Settings</p>
        </div>
      </div>

      <ProfileInfoGrid>
        <div className="avatar">
          {' '}
          <img
            className="writeImg"
            src={`${avatarUrl}?square&colors=8dedf9,cd72fe,f6ed60,ff99f2,fec880`}
            alt={username}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = birbImages.noavatar;
            }}
          ></img>
        </div>
        <div className="username">{username}</div>
      </ProfileInfoGrid>

      <MainContainer>
        <button className="bigBlueButton" onClick={handleClickLogoutButton}>
          <NavLink to="/">
            <p>Logout</p>
          </NavLink>
        </button>
      </MainContainer>

      <SubTitle>Username</SubTitle>
      <MainContainer>
        <Boxtitle>new username</Boxtitle>
        <InputField>
          <input
            className=""
            ref={newUsername}
            minLength="3"
            maxLength="20"
          ></input>
        </InputField>
      </MainContainer>

      <SubTitle>Password</SubTitle>
      <MainContainer>
        <Boxtitle>new password</Boxtitle>
        <InputField>
          <input
            type="password"
            className=""
            ref={password1}
            minLength="6"
            maxLength="60"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
          ></input>
        </InputField>

        <Boxtitle>repeat new password</Boxtitle>
        <InputField>
          <input
            type="password"
            className=""
            ref={password2}
            minLength="6"
            maxLength="60"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
          ></input>
        </InputField>
      </MainContainer>

      <MainContainer>
        <button className="bigBlueButton" onClick={saveSettings}>
          Save the Settings
        </button>
      </MainContainer>
    </div>
  );
}
