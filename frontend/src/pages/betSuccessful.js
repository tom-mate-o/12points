import React from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
  console.log(selectedPlaces);

  return (
    <div>
      <Title>Bet successful</Title>

      <MainContainer>
        <HighlightedContainer>
          <p>
            You have successfully placed your bet on the following countries:
          </p>
          <ul>
            {Object.entries(selectedPlaces)
              .sort((a, b) => a[1] - b[1])
              .map(([place, rank], index) => {
                return (
                  <li key={index}>
                    {place}: Rank {rank}
                  </li>
                );
              })}
          </ul>
        </HighlightedContainer>

        <NavLink to="/bet">
          <button>back</button>
        </NavLink>
      </MainContainer>
    </div>
  );
}
