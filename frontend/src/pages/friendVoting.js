import React, { useState } from 'react';
import { useEffect } from 'react';
import { TiHeartFullOutline } from 'react-icons/ti';
import countries from '../countries.json';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaChevronCircleDown } from 'react-icons/fa';
import { FaChevronCircleUp } from 'react-icons/fa';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

//Styled Components
import { MainContainer } from '../styledComponents/mainContainer';
import { VoteContainer } from '../styledComponents/voteContainer';

export default function FriendVoting() {
  const [userSelectedPoints, setUserSelectedPoints] = useState({});
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState({});

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  const user = userData.find((user) => user.id === userId);
  const userVotes = user ? user.voting : {};
  const username = user ? user.username : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (userVotes) {
        setUserSelectedPoints(userVotes);
      }
    };

    fetchUser();
  }, [userData]);

  const toggleMoreFunction = (element, countryName) => {
    element.classList.toggle('open');
    setIsOpen((prevState) => ({
      ...prevState,
      [countryName]: !prevState[countryName],
    }));
  };

  return (
    <div>
      <div className="title">
        <p>{username}'s</p>
        <div className="title__lastRow">
          <p>Vote</p>
          <span>
            <TiHeartFullOutline />
          </span>
        </div>
      </div>

      <MainContainer>
        {countries
          .filter(
            (country) => country.final && userSelectedPoints[country.name]
          )
          .sort(
            (a, b) => userSelectedPoints[b.name] - userSelectedPoints[a.name]
          )
          .map((country) => (
            <VoteContainer className="voteContainer" key={country.code}>
              <div className="voteContainer__artistContainer">
                <div className="voteContainer__rowContainer">
                  <div className="voteContainer__countryContainer">
                    <img
                      className="voteContainer__countryFlag"
                      src={`/flags/${country.flag}.png`}
                      alt={country.name}
                    />

                    <h3 className="country">
                      <b>{country.name}</b>
                    </h3>
                  </div>

                  <div className="voteContainer__pointsContainer friend">
                    {userSelectedPoints[country.name] && (
                      <span>{userSelectedPoints[country.name]}</span>
                    )}
                  </div>
                </div>
                <div className="voteContainer__lowerContainer">
                  <div className="voteContainer__infoContainer">
                    <div className="voteContainer__infoContainer__text">
                      <h3>{country.participant}</h3>

                      <p className="voteContainer__infoContainer__song">
                        "{country.song}"
                      </p>
                    </div>
                  </div>
                  <button
                    className="moreButton"
                    onClick={(e) => {
                      const toggleMoreDiv = e.currentTarget.nextElementSibling;
                      toggleMoreFunction(toggleMoreDiv, country.name);
                    }}
                  >
                    {isOpen[country.name] ? (
                      <FaChevronCircleUp />
                    ) : (
                      <FaChevronCircleDown />
                    )}
                  </button>
                  <div className="toggleMore open">
                    <iframe
                      style={{ borderRadius: '12px' }}
                      src={country.spotify}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                    <a href={country.url} target="_blank">
                      <button className="bigBlueButton">Artist Info</button>
                    </a>
                  </div>
                </div>
              </div>
            </VoteContainer>
          ))}
      </MainContainer>
    </div>
  );
}
