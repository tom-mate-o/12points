import React from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';

//Styled Components

import { MainContainer } from '../styledComponents/mainContainer';

export default function VoteSuccessful() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const selectedPlaces = location.state || {};
  console.log(selectedPlaces);

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
        <p>You have successfully voted for the following countries:</p>
        <ul>
          {Object.entries(selectedPlaces)
            .sort((a, b) => b[1] - a[1])
            .map(([place, points], index) => {
              return (
                <li key={index}>
                  {place}: {points} Points
                </li>
              );
            })}
        </ul>
        <p>
          Remember, your previous votes will be overwritten if you submit votes
          again!
        </p>

        <NavLink to="/voting">
          <button className="bigBlueButton">back</button>
        </NavLink>
      </MainContainer>
    </div>
  );
}
