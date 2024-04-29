import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Countdown, { contdown } from '../components/countdown';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaRankingStar } from 'react-icons/fa6';
import Avatar from 'boring-avatars';

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

export default function Feed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData, setUserData } = useMongoDBUserData([]);
  const colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
  const getRandomColors = () => {
    const colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
    return colors
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .join(',');
  };

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
      <Title>Feed</Title>

      <MainContainer>
        <Boxtitle>Your Friends</Boxtitle>

        {userData.map((user) => (
          <FriendListGrid key={user.id}>
            <div className="avatar">
              {' '}
              <img
                src={`${user.avatarUrl}?square&colors=8dedf9,cd72fe,f6ed60,ff99f2,fec880`}
                alt={user.name}
              />
            </div>
            <div className="name">
              <p>{user.username}</p>
            </div>
            <div className="buttonContainer">
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
          </FriendListGrid>
        ))}
      </MainContainer>

      <div className="buttonContainer">
        <NavLink to="/voting">
          <SmallButtons>
            <TiHeartFullOutline />
            <p>give your personal 12 points</p>
          </SmallButtons>
        </NavLink>
        <NavLink to="/bet">
          <SmallButtons>
            <FaRankingStar /> <p>place your bet for the final</p>
          </SmallButtons>
        </NavLink>
      </div>
    </div>
  );
}
