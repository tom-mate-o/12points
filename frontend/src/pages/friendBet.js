import React, { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import countries from '../countries.json';
import { FaChevronCircleDown } from 'react-icons/fa';
import { FaChevronCircleUp } from 'react-icons/fa';
import { TiHeartFullOutline } from 'react-icons/ti';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

//Utils
import { putRankingBetResultsToUserConfig } from '../utils/putRankingBetResultsToUserConfig';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';
import { VoteContainer } from '../styledComponents/voteContainer';

export default function FriendBet() {
  const [isLoading, setIsLoading] = useState(true);
  const [rankArray, setRankArray] = useState([
    '-',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
  ]);
  const [disabledPlaces, setDisabledPlaces] = useState([]);

  const [selectedPlaces, setSelectedPlaces] = useState({});
  const [userSelectedPlaces, setUserSelectedPlaces] = useState({});
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState({});

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === userId);
  const userBets = user ? user.bet : {};
  const username = user ? user.username : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (userBets) {
        setUserSelectedPlaces(userBets);
      }
    };

    fetchUser();
  }, [userData]);

  async function submitVotes() {
    const id = decodedToken;
    const bet = selectedPlaces;
    const success = await putRankingBetResultsToUserConfig(id, bet);

    if (success) {
      navigate('/betsuccessful', { state: selectedPlaces });
      console.log('success');
    }
  }

  const toggleMoreFunction = (element, countryName) => {
    element.classList.toggle('open');
    setIsOpen((prevState) => ({
      ...prevState,
      [countryName]: !prevState[countryName],
    }));
  };

  const pushPlaces = (e, countryName) => {
    const place = Number(e.target.value);

    setDisabledPlaces((prevPlaces) => {
      const previousPlace = selectedPlaces[countryName];
      const newPlaces = previousPlace
        ? prevPlaces.filter((p) => p !== previousPlace)
        : prevPlaces;

      if (!newPlaces.includes(place)) {
        newPlaces.push(place);
      }
      return newPlaces;
    });

    setSelectedPlaces((prevSelectedPlaces) => ({
      ...prevSelectedPlaces,
      [countryName]: place,
    }));
  };

  return (
    <div>
      <div className="title">
        <p>{username}'s</p>
        <div className="title__lastRow">
          <p>Final Bet</p>
          <span>
            <TiHeartFullOutline />
          </span>
        </div>
      </div>

      <MainContainer>
        {countries
          .filter(
            (country) => country.final && userSelectedPlaces[country.name]
          )
          .sort(
            (a, b) => userSelectedPlaces[a.name] - userSelectedPlaces[b.name]
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
                    {userSelectedPlaces[country.name] && (
                      <span>{userSelectedPlaces[country.name] + '.'}</span>
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
