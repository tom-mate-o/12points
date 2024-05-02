import React from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import countries from '../countries.json';

//Styled Components

import { MainContainer } from '../styledComponents/mainContainer';

export default function VoteSuccessful() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const selectedPlaces = location.state || {};

  return (
    <div>
      <div className="title">
        <p>Vote</p>
        <div className="title__lastRow">
          <p>successful</p>
          <span>
            <FaVoteYea />
          </span>
        </div>
      </div>

      <MainContainer>
        <div className="infoText">
          <p>You have successfully voted for the following countries:</p>
        </div>
        <div className="voteContainer success">
          {Object.entries(selectedPlaces)
            .sort((a, b) => b[1] - a[1])
            .map(([place, points], index) => {
              const country = countries.find(
                (country) => country.name === place
              );
              return (
                <div className="voteContainer__rowContainer" key={index}>
                  <div className="voteContainer__countryContainer">
                    <img
                      className="voteContainer__countryFlag"
                      src={`/flags/${country.flag}.png`}
                      alt={country.name}
                    />
                    <div className="voteContainer__countryContainer">
                      <h3 className="country">
                        <b> {place}</b>
                      </h3>
                    </div>
                  </div>
                  <div className="voteContainer__pointsContainer friend">
                    <span>{points}</span>
                  </div>
                </div>
              );
            })}
          <br />
        </div>
        <div className="infoText">
          <b>
            Remember, your previous votes will be overwritten if you submit
            votes again!
          </b>
        </div>

        <NavLink to="/voting">
          <button className="bigBlueButton">back</button>
        </NavLink>
      </MainContainer>
    </div>
  );
}
