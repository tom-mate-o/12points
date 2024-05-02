import React from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import countries from '../countries.json';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';

import { HighlightedContainer } from '../styledComponents/hightlightedContainer';

import { Boxtitle } from '../styledComponents/boxtitle';

export default function BetSuccessful() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const selectedPlaces = location.state || {};

  return (
    <div>
      <div className="title">
        <p>Ranking Bet</p>
        <div className="title__lastRow">
          <p>successful</p>
          <span>
            <FaVoteYea />
          </span>
        </div>
      </div>

      <MainContainer>
        <div className="infoText">
          <p>
            You have successfully submited the following ranking bet for the ESC
            final 2024:
          </p>
        </div>
        <div className="voteContainer success">
          {Object.entries(selectedPlaces)
            .sort((a, b) => a[1] - b[1])
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
                        <b>{place}</b>
                      </h3>
                    </div>
                  </div>
                  <div className="voteContainer__pointsContainer friend">
                    <span>{points}.</span>
                  </div>
                </div>
              );
            })}
          <br />
        </div>
        <div className="infoText">
          <b>
            Remember, your previous bet will be overwritten if you submit a
            ranking bet again!
          </b>
        </div>

        <NavLink to="/bet">
          <button className="bigBlueButton">back</button>
        </NavLink>
      </MainContainer>
    </div>
  );
}
