import React, { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import countries from '../countries.json';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  const voteOpen = true;
  const [disabledPoints, setDisabledPoints] = useState([]);

  const [selectedPoints, setSelectedPoints] = useState({});
  const [userSelectedPoints, setUserSelectedPoints] = useState({});
  const navigate = useNavigate();

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

  const user = userData.find((user) => user.id === decodedToken.id);
  const userVotes = user ? user.voting : {};

  useEffect(() => {
    const fetchUser = async () => {
      if (userVotes) {
        setUserSelectedPoints(userVotes);
        console.log(userVotes);
      }
    };

    fetchUser();
  }, [userData]);

  async function submitVotes() {
    const id = decodedToken;
    const voting = selectedPoints;
    const success = await putVotingResultsToUserConfig(id, voting);

    console.log(selectedPoints);

    if (success) {
      console.log('Voting submitted');
      navigate('/votesuccessful', { state: selectedPoints });
      console.log('success');
    }
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
        {voteOpen ? (
          countries
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
                    {userSelectedPoints[country.name] && (
                      <span>
                        {userSelectedPoints[country.name] + ' Points'}
                      </span>
                    )}
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
            ))
        ) : (
          <p>
            The vote is not open yet.
            <br />
            It will open as soon as the finalists are announced.
          </p>
        )}
        {voteOpen && <button onClick={submitVotes}>Submit</button>}
      </MainContainer>
    </div>
  );
}
