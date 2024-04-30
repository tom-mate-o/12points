import React from 'react';
import countries from '../../countries.json';

export default function CalculatePoints({ userBet }) {
  let points = 0;

  countries.forEach((country) => {
    if (country.rank !== 0) {
      const userRank = userBet[country.name];
      if (userRank === country.rank) {
        switch (userRank) {
          case 1:
            points += 25;
            break;
          case 2:
            points += 20;
            break;
          case 3:
            points += 15;
            break;
          default:
            points += 5;
            break;
        }
        // 10 Punkte für letzten PLatz (5 für richtigen PLatz + 5 für richtigen letzten)
        if (userRank === 26) {
          points += 5;
        }
      }
    }
    console.log('points calculated');
  });

  return <div>User points: {points}</div>;
}
