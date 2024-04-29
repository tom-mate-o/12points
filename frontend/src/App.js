import './App.css';

import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loadTheme } from './loadTheme';

import Feed from './pages/feed';
import Voting from './pages/voting';
import Bet from './pages/bet';
import Friends from './pages/friends';

import Settings from './pages/settings';
import Login from './pages/login';
import Register from './pages/register';

import BetSuccessful from './pages/betSuccessful';
import VoteSuccessful from './pages/voteSuccessful';
import FriendVoting from './pages/friendVoting';
import FriendBet from './pages/friendBet';

import ResetPassword from './pages/resetpassword';
import NotFoundPage from './pages/notFoundPage';

import Navbar from './components/navbar';
import { ToastContainer } from 'react-toastify';
import showNotifications from './components/showNotifications/showNotificationsToastify';

// costum hooks
import useMongoDBUserData from './costumHooks/useMongoDBUserData';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isBellRed, setIsBellRed] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null); // Benötigt für die Benachrichtigungen
  const [iconClicked, setIconClicked] = useState(false);
  const [theme, setTheme] = useState('sunriseSunset-theme');

  const token = localStorage.getItem('token');
  let UserID;

  if (token) {
    const decodedToken = jwtDecode(token);
    UserID = decodedToken?.id;
  }

  const { userData, refetch } = useMongoDBUserData();

  useEffect(() => {
    refetch();
  }, [iconClicked]);

  useEffect(() => {
    if (userData) {
      // Finde die Daten des eingeloggten Benutzers
      const currentUserData = userData.find((user) => user.id === UserID);

      if (currentUserData) {
        const newNotifications = [];

        if (currentUserData) {
          const hasUnreadNotifications =
            currentUserData.recievedPostsIds.some((post) => !post.read) ||
            currentUserData.friendIds.some((friend) => !friend.read);
          setIsBellRed(hasUnreadNotifications);
        } else {
          setIsBellRed(false);
        }

        if (
          currentUserData.userSettings &&
          currentUserData.userSettings[0].theme
        ) {
          setTheme(currentUserData.userSettings[0].theme);
          loadTheme(theme);
        }

        // Überprüfen die recievedPostsIds, wenn sie existieren
        if (currentUserData.recievedPostsIds) {
          currentUserData.recievedPostsIds.forEach((post) => {
            if (!post.read) {
              newNotifications.push({
                id: post.id,
                message: 'sent you a Message',
                type: 'post',
              });
            }
          });
        }

        // Überprüfen die friendIds, wenn sie existieren
        if (currentUserData.friendIds) {
          currentUserData.friendIds.forEach((friend) => {
            if (!friend.read) {
              newNotifications.push({
                friendcode: friend.friendcode,
                date: friend.date,
                message: 'is now your friend!',
                type: 'friend',
              });
            }
          });
        }

        // Setze die neuen Benachrichtigungen
        setNotifications(newNotifications);
        setCurrentUserData(currentUserData);
      }
    }
  }, [userData, loggedIn, UserID, iconClicked]); // Abhängigkeit

  const handleLogout = () => {
    setNotifications([]);
    setLoggedIn(false);
    setIsBellRed(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('theme');
    showNotifications('Bye, for now! 👋', '');
  };

  const handleLogin = () => {
    setLoggedIn(true);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  function handleBellColorChange(value) {
    setIsBellRed(value);
  }

  const handleIconClick = () => {
    setIconClicked(!iconClicked);
  };

  return (
    <div className="App">
      {/* -------BROWSER ROUTER------- */}

      <BrowserRouter>
        <div className="contentContainer">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Feed />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/betsuccessful"
              element={
                loggedIn ? (
                  <BetSuccessful />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/votesuccessful"
              element={
                loggedIn ? (
                  <VoteSuccessful />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/friendvoting/:userId"
              element={
                loggedIn ? (
                  <FriendVoting />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/friendbet/:userId"
              element={
                loggedIn ? (
                  <FriendBet />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/feed"
              element={
                loggedIn ? (
                  <Feed />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/voting"
              element={
                loggedIn ? (
                  <Voting />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/bet"
              element={
                loggedIn ? (
                  <Bet />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            <Route
              path="/friends"
              element={
                loggedIn ? (
                  <Friends />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />

            <Route
              path="/settings"
              element={
                loggedIn ? (
                  <Settings handleLogout={handleLogout} />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            />
            {/* <Route
              path="/post/:postId"
              element={
                loggedIn ? (
                  <Post handleLogout={handleLogout} />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    replace
                  />
                )
              }
            /> */}
            <Route
              path="/login"
              element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToastContainer />
        </div>

        {/* -------NAVBAR------- */}
        <Navbar
          key={UserID}
          isBellRed={isBellRed}
          handleIconClick={handleIconClick}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
