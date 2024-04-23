import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Countdown, { contdown } from '../components/countdown';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaRankingStar } from 'react-icons/fa6';

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
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          Welcome to Twelve Points <br />
          Have a look how your friends voted
        </div>
      </InfoContainer>
      <MainContainer>
        <Boxtitle>Your Friends</Boxtitle>

        {userData.map((user) => (
          <FriendListGrid key={user.id}>
            <div className="avatar">A</div>
            <div className="name">
              <p>{user.username}</p>
            </div>
            <div className="buttonContainer">
              {user.voting && Object.keys(user.voting).length > 0 ? (
                <button>
                  <TiHeartFullOutline />
                </button>
              ) : (
                ''
              )}

              <button>
                {user.bet && Object.keys(user.bet).length > 0 ? (
                  <FaRankingStar />
                ) : (
                  ''
                )}
              </button>
            </div>
          </FriendListGrid>
        ))}
      </MainContainer>

      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          Give your own points for your favourties
          <br />
          and place your bet for the finals
          <br />
          <Countdown />
        </div>
      </InfoContainer>

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
