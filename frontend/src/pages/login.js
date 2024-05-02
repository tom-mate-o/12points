import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { compareLoginToDatabase } from '../utils/compareLoginToDatabase';
import { useNavigate } from 'react-router-dom';

//Styled Components
import { MainContainer } from '../styledComponents/mainContainer';
import { birbImages } from '../assets/birbs/birbsimgs';
import { Boxtitle } from '../styledComponents/boxtitle';
import { InputField } from '../styledComponents/inputField';
import { SubmitButton } from '../styledComponents/submitButton';
import showNotifications from '../components/showNotifications/showNotificationsToastify';

export default function Login({ handleLogin, loggedIn }) {
  //muss in {} sein, da sonst nicht erkannt wird, dass loggedIn true ist
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('loggedIn: ' + loggedIn);
    if (loggedIn) {
      navigate('/feed');
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const res = await compareLoginToDatabase(data);
      if (res) {
        localStorage.setItem('token', res.token);
        handleLogin(); // setLoggedIn(true) in App.js, damit die Weiterleitung auf /feed funktioniert
        //getUserNamefromDB + setUsername Localstorage
      }
    } catch (error) {
      showNotifications('Login failed!', 'error');
    }
  };

  return (
    <div>
      <div className="welcomeLogo">
        <img src={birbImages.logo} alt="logo" />
      </div>

      <div className="introtext">
        <p>
          <b>
            Hey there 👋 and welcome to Twelve Points, the tip game for the ESC
            2024.
          </b>
        </p>
        <p>
          Together with the other group members, you bet on the placings in the
          final and receive points for each correct one. The one with the most
          points is the winner. It's as simple as that.
        </p>
        <p>
          Of course, you can also check what your friends have predicted and
          even give your own personal points to your favorites.
        </p>

        <p>On that note... 12 points go to....?</p>
      </div>

      <MainContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Boxtitle>Username</Boxtitle>
          <InputField>
            <input ref={username} className=""></input>
          </InputField>

          <Boxtitle>Password</Boxtitle>
          <InputField>
            <input ref={password} type="password" className=""></input>
          </InputField>
          <SubmitButton>
            <button type="submit">Login</button>
          </SubmitButton>
        </form>
      </MainContainer>

      <div className="welcomeLink">
        <div>
          Don't Have an Account yet?
          <br />
          <NavLink to="/register">Click here to sign up!</NavLink>
        </div>

        <div>
          Forgot your Password?
          <br />
          <NavLink to="/resetpassword">Click here to get a new one!</NavLink>
        </div>
      </div>
    </div>
  );
}
