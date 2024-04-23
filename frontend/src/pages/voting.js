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

  const [selectedPoints, setSelectedPoints] = useState({});

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
      <Title>My Voting</Title>

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
                  <div className="container">
                    <div className="infoContainer">
                      <h3>
                        <b>{country.name}</b>
                      </h3>
                      <p>{country.participant}</p>
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
                  </div>
                </div>
                <i>
                  <p className="song">"{country.song}"</p>
                </i>
                <hr />
              </div>
            </VoteContainer>
          ))}
      </MainContainer>
    </div>
  );
}
