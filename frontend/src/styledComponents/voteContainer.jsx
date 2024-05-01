import styled, { css } from 'styled-components';

export const VoteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--textInContainer);
  padding-top: 10px;
  padding-bottom: 0px;

  .artistContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 5px;

    .song {
      padding-top: 5px;
    }
  }

  .rowContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: left;
  }

  .countryFlag {
    width: 2.5rem;
    width: clamp(2.5rem, 1.7857142857142856rem + 5.714285714285714vw, 3.125rem);
    height: 2.5rem;
    height: clamp(
      2.5rem,
      1.7857142857142856rem + 5.714285714285714vw,
      3.125rem
    );
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
    object-position: center;
  }

  .infoContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }
`;
