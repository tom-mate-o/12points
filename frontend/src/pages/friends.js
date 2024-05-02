import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Countdown, { contdown } from '../components/countdown';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaRankingStar } from 'react-icons/fa6';
import Avatar from 'boring-avatars';
import CalculatePoints from '../components/functions/calculatePoints';
import { jwtDecode } from 'jwt-decode';
import { FaUserFriends } from 'react-icons/fa';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

//Styled Components
import { Title } from '../styledComponents/title';
import { FriendListGrid } from '../styledComponents/friendListGrid';
import { MainContainer } from '../styledComponents/mainContainer';
import { GoodThingContainerBirdLeft } from '../styledComponents/goodThingContainerBirdLeft';
import { GoodThingContainerBirdRight } from '../styledComponents/goodThingContainerBirdRight';
import { Button } from '../styledComponents/button';
import { HighlightedContainer } from '../styledComponents/hightlightedContainer';
import { InfoContainer } from '../styledComponents/infoContainer';
import { Boxtitle } from '../styledComponents/boxtitle';

import { HiOutlineLightBulb } from 'react-icons/hi';
import { birbImages } from '../assets/birbs/birbsimgs';
import { SmallButtons } from '../styledComponents/smallButtons';

export default function Friends() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData, refetch } = useMongoDBUserData([]);

  useEffect(() => {
    refetch();
  }, []);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const currentUser = userData.find((user) => user.id === decodedToken.id);
  const otherUsers = userData
    .filter((user) => user.id !== decodedToken.id)
    .sort((a, b) => a.username.localeCompare(b.username));

  if (!userData || userData.length === 0) {
    return (
      <MainContainer>
        <div>
          <img
            className="birdImg"
            src={birbImages.pecking_animation}
            alt="birb1"
          ></img>
          ...Loading...
        </div>
      </MainContainer>
    );
  }

  return (
    <div>
      <div className="title">
        <p>ESC 2024</p>
        <div className="title__lastRow">
          <p>Tipgroup</p>
          <span>
            <FaUserFriends />
          </span>
        </div>
      </div>

      <MainContainer>
        <div className="infoText">
          <b>You will receive points for each correct place.</b>
          <br />
          <br />
          <p>🥇 1st place +25 points</p>
          <p>🥈 2nd place +20 points</p>
          <p>🥉 3rd place +15 points</p>
          <p>each further place +5 points</p>
          <p>correct last place +10 points</p>
        </div>
      </MainContainer>

      <MainContainer>
        {currentUser && (
          <div
            className="friendlistGrid gradientContainer currentUser"
            key={currentUser.id}
          >
            <div className="friendlistGrid__avatar">
              <img
                src={`${currentUser.avatarUrl}?square&colors=8dedf9,cd72fe,f6ed60,ff99f2,fec880`}
                alt={currentUser.name}
              />
            </div>
            <div className="friendlistGrid__name">
              <h3>{currentUser.username}</h3>
              <div>
                <CalculatePoints userBet={currentUser.bet} />
              </div>
            </div>
            <div className="friendlistGrid__buttonContainer">
              {currentUser.voting &&
              Object.keys(currentUser.voting).length > 0 ? (
                <NavLink to={`/friendvoting/${currentUser.id}`}>
                  <button>
                    <TiHeartFullOutline />
                  </button>
                </NavLink>
              ) : (
                ''
              )}

              {currentUser.bet && Object.keys(currentUser.bet).length > 0 ? (
                <NavLink to={`/friendbet/${currentUser.id}`}>
                  <button>
                    <FaRankingStar />
                  </button>
                </NavLink>
              ) : (
                ''
              )}
            </div>
          </div>
        )}

        {otherUsers.map((user) => {
          return (
            <div className="friendlistGrid gradientContainer" key={user.id}>
              <div className="friendlistGrid__avatar">
                {' '}
                <img
                  src={`${user.avatarUrl}?square&colors=8dedf9,cd72fe,f6ed60,ff99f2,fec880`}
                  alt={user.name}
                />
              </div>
              <div className="friendlistGrid__name">
                <h3>{user.username}</h3>
                <div>
                  <CalculatePoints userBet={user.bet} />
                </div>
              </div>
              <div className="friendlistGrid__buttonContainer">
                {user.voting && Object.keys(user.voting).length > 0 ? (
                  <NavLink to={`/friendvoting/${user.id}`}>
                    <button>
                      <TiHeartFullOutline />
                    </button>
                  </NavLink>
                ) : (
                  ''
                )}

                {user.bet && Object.keys(user.bet).length > 0 ? (
                  <NavLink to={`/friendbet/${user.id}`}>
                    <button>
                      <FaRankingStar />
                    </button>
                  </NavLink>
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        })}
      </MainContainer>
    </div>
  );
}
