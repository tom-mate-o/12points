import React, { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import countries from '../countries.json';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

//Utils
import { putVotingResultsToUserConfig } from '../utils/putVotingResultsToUserConfig';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';
import { Button } from '../styledComponents/button';
import { VoteContainer } from '../styledComponents/voteContainer';

export default function Voting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const [pointArray, setPointArray] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const [disabledPoints, setDisabledPoints] = useState([]);

  const [selectedPoints, setSelectedPoints] = useState({});

  function submitVotes() {
    console.log(selectedPoints);

    const id = decodedToken;
    console.log(id);
    const voting = selectedPoints;
    putVotingResultsToUserConfig(id, voting);
  }

  const toggleMoreFunction = function (element) {
    element.classList.toggle('open');
  };

  const pushNumbers = (e, countryName) => {
    console.log(countryName, e.target.value);
    const point = Number(e.target.value);

    setDisabledPoints((prevPoints) => {
      // Entfernen  den vorherigen Punkt für dieses Land, wenn vorhanden
      const previousPoint = selectedPoints[countryName];
      const newPoints = previousPoint
        ? prevPoints.filter((p) => p !== previousPoint)
        : prevPoints;

      // Füge den neuen Punkt hinzu, wenn er nicht bereits ausgewählt ist
      if (!newPoints.includes(point)) {
        newPoints.push(point);
      }

      return newPoints;
    });

    // Aktualisiere den ausgewählten Punkt für dieses Land
    setSelectedPoints((prevSelectedPoints) => ({
      ...prevSelectedPoints,
      [countryName]: point,
    }));
  };

  return (
    <div>
      <Title>Personal Vote</Title>

      <MainContainer>
        <hr />
        {countries
          .filter((country) => country.final)
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
                  <select
                    defaultValue="0"
                    onChange={(e) => pushNumbers(e, country.name)}
                  >
                    {pointArray.map((point, index) => (
                      <option
                        key={index}
                        value={point}
                        disabled={disabledPoints.includes(point)}
                      >
                        {point}
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
