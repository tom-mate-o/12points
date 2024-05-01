import React, { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Countdown from '../components/countdown';
import { FaRankingStar } from 'react-icons/fa6';
import { FaVoteYea } from 'react-icons/fa';
import { FaChevronCircleDown } from 'react-icons/fa';
import { FaChevronCircleUp } from 'react-icons/fa';
import countries from '../countries.json';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

//Utils
import { putRankingBetResultsToUserConfig } from '../utils/putRankingBetResultsToUserConfig';

//Styled Components
import { MainContainer } from '../styledComponents/mainContainer';
import { VoteContainer } from '../styledComponents/voteContainer';

export default function Bet() {
  const betOpen = true;

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
  const [isOpen, setIsOpen] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    }
  }, [userData]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === decodedToken.id);
  const userBets = user ? user.bet : {};

  useEffect(() => {
    const fetchUser = async () => {
      if (userBets) {
        setUserSelectedPlaces(userBets);
        console.log(userBets);
      }
    };

    fetchUser();
  }, [userData]);

  async function submitVotes() {
    const id = decodedToken;
    const bet = selectedPlaces;
    const success = await putRankingBetResultsToUserConfig(id, bet);

    console.log(selectedPlaces);

    if (success) {
      console.log(selectedPlaces);
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
    console.log(countryName, e.target.value);
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
        <p>Ranking Bet</p>
        <div className="title__lastRow">
          <p>Final</p>
          <span>
            <FaRankingStar />
          </span>
        </div>
      </div>

      <MainContainer>
        <div className="infoText">
          <p>
            Who will be the winner?
            <br />
            Rank all 26 finalists, score points and beat your friends.
          </p>
        </div>
      </MainContainer>

      <div className="countdown">
        {' '}
        <Countdown />
      </div>

      <MainContainer>
        {betOpen ? (
          countries
            .filter((country) => country.final)
            .sort((a, b) => a.startnumber - b.startnumber)
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

                    <div className="voteContainer__pointsContainer">
                      {userSelectedPlaces[country.name] && (
                        <span>
                          <FaVoteYea />
                          {userSelectedPlaces[country.name]}.
                        </span>
                      )}
                      <select
                        defaultValue={'-'}
                        onChange={(e) => pushPlaces(e, country.name)}
                      >
                        {rankArray.map((rank, index) => (
                          <option
                            key={index}
                            value={rank}
                            disabled={disabledPlaces.includes(rank)}
                          >
                            {rank}
                          </option>
                        ))}
                      </select>
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
                        const toggleMoreDiv =
                          e.currentTarget.nextElementSibling;
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
            ))
        ) : (
          <p>
            The bet is not open yet.
            <br />
            It will open as soon as the finalists are announced.
          </p>
        )}
        {betOpen && (
          <button onClick={submitVotes} className="bigBlueButton">
            Submit
          </button>
        )}
      </MainContainer>
    </div>
  );
}
