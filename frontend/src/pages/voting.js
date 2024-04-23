import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import countries from '../countries.json';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';

import { HighlightedContainer } from '../styledComponents/hightlightedContainer';

import { Boxtitle } from '../styledComponents/boxtitle';
import { VoteContainer } from '../styledComponents/voteContainer';

export default function Voting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [pointArray, setPointArray] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 10, 12,
  ]);

  const [disabledPoints, setDisabledPoints] = useState([]);

  const pushNumbers = (e, countryName) => {
    console.log(countryName, e.target.value);
    setDisabledPoints([...disabledPoints, Number(e.target.value)]);
  };

  return (
    <div>
      <Title>Voting</Title>

      <MainContainer>
        <p>Voting</p>

        {countries
          .filter((country) => country.final)
          .map((country) => (
            <VoteContainer key={country.code}>
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

                <p>
                  <i>"{country.song}"</i>
                </p>
              </div>
              <select onChange={(e) => pushNumbers(e, country.name)}>
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
            </VoteContainer>
          ))}
      </MainContainer>
    </div>
  );
}
