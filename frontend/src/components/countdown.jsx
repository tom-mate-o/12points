import { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeftOpen, setTimeLeftOpen] = useState(calculateTimeLeftOpen());
  const [timeLeftClosing, setTimeLeftClosing] = useState(
    calculateTimeLeftClosing()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftClosing(calculateTimeLeftClosing());
      setTimeLeftOpen(calculateTimeLeftOpen());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // VOTING OPEN TIME
  function calculateTimeLeftOpen() {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-05-11T08:00:00`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // VOTING CLOSING TIME
  function calculateTimeLeftClosing() {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-05-11T22:30:00`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponentsOpen = [];
  const timerComponentsClosing = [];

  Object.keys(timeLeftOpen).forEach((interval, index) => {
    timerComponentsOpen.push(
      <span key={index}>
        {timeLeftOpen[interval]} {interval}{' '}
      </span>
    );
  });

  Object.keys(timeLeftClosing).forEach((interval, index) => {
    timerComponentsClosing.push(
      <span key={index}>
        {timeLeftClosing[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div>
      {new Date() < new Date(`${new Date().getFullYear()}-05-11T08:00:00`) ? (
        <span>
          Voting opens in
          <br />
          {timerComponentsOpen}
        </span>
      ) : new Date() <
        new Date(`${new Date().getFullYear()}-05-11T22:30:00`) ? (
        <span>
          You still have
          <br />
          {timerComponentsClosing}
          <br />
          to vote and bet
        </span>
      ) : (
        <span>
          Time
          <br />
          is
          <br />
          up
        </span>
      )}
    </div>
  );
}
