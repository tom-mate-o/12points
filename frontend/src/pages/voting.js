import React, { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import countries from '../countries.json';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Countdown from '../components/countdown';
import { TiHeartFullOutline } from 'react-icons/ti';
import { FaVoteYea } from 'react-icons/fa';
import { FaChevronCircleDown } from 'react-icons/fa';
import { FaChevronCircleUp } from 'react-icons/fa';

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
      <div className="title">
        <p>Personal</p>
        <div className="title__lastRow">
          <p>Vote</p>
          <span>
            <TiHeartFullOutline />
          </span>
        </div>
      </div>

      <MainContainer>
        <div className="infoText">
          <p>
            12 points go to... 😉
            <br />
            Give your personal points to the finalists of the ESC 2024.
          </p>
        </div>
      </MainContainer>

      <div className="countdown">
        {' '}
        <Countdown />
      </div>

      <MainContainer>
        {voteOpen ? (
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
                      {userSelectedPoints[country.name] && (
                        <span>
                          <FaVoteYea />
                          {userSelectedPoints[country.name]}
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
                        toggleMoreFunction(toggleMoreDiv);
                      }}
                    >
                      <FaChevronCircleDown />
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
            The vote is not open yet.
            <br />
            It will open as soon as the finalists are announced.
          </p>
        )}
        {voteOpen && (
          <button onClick={submitVotes} className="bigBlueButton">
            Submit
          </button>
        )}
      </MainContainer>
    </div>
  );
}
