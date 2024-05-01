import React from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';

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
        <p>You have successfully placed your bet on the following countries:</p>
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
        <p>
          Remember, your previous bets will be overwritten if you submit bets
          again!
        </p>

        <NavLink to="/bet">
          <button className="bigBlueButton">back</button>
        </NavLink>
      </MainContainer>
    </div>
  );
}
