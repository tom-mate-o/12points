import React, { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import countries from '../countries.json';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

//Utils
import { putRankingBetResultsToUserConfig } from '../utils/putRankingBetResultsToUserConfig';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';

import { HighlightedContainer } from '../styledComponents/hightlightedContainer';

import { Boxtitle } from '../styledComponents/boxtitle';
import { VoteContainer } from '../styledComponents/voteContainer';

export default function Bet() {
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

  function submitVotes() {
    console.log(selectedPlaces);

    const id = decodedToken;
    const bet = selectedPlaces;
    putRankingBetResultsToUserConfig(id, bet);
  }

  const toggleMoreFunction = function (element) {
    element.classList.toggle('open');
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
      <Title>Bet</Title>

      <MainContainer>
        {countries
          .filter((country) => country.final)
          .sort((a, b) => a.startnumber - b.startnumber)
          .map((country) => (
            <VoteContainer key={country.code}>
              <div className="artistContainer">
                <div className="rowContainer">
                  <img
                    className="countryFlag"
                    src={`/flags/${country.flag}.png`}
                    alt={country.name}
                  />

                  <div className="infoContainer">
                    <h3>
                      <b>{country.name}</b>
                    </h3>
                    <p>{country.participant}</p>
                  </div>
                  {userSelectedPlaces[country.name] && (
                    <span>{userSelectedPlaces[country.name]}</span>
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
                <i>
                  <p className="song">"{country.song}"</p>
                </i>
                <button
                  onClick={(e) => {
                    const toggleMoreDiv = e.target.nextSibling;
                    toggleMoreFunction(toggleMoreDiv);
                  }}
                >
                  open more
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
                    <button>Artist Info</button>
                  </a>
                </div>

                <hr />
              </div>
            </VoteContainer>
          ))}
        <button onClick={submitVotes}>Submit</button>
      </MainContainer>
    </div>
  );
}
