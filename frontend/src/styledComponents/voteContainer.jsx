import styled, { css } from 'styled-components';

export const VoteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--textInContainer);
  margin-bottom: 15px;

  padding-top: 10px;
  padding-bottom: 0px;

  .rowContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .artistContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;

    .song {
      padding-top: 5px;
    }
  }

  input {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    text-align: center;
    border: none;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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

  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .infoContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }

  select {
    width: 2.5rem;
    width: clamp(2.5rem, 1.7857142857142856rem + 5.714285714285714vw, 3.125rem);
    height: 2.5rem;
    height: clamp(
      2.5rem,
      1.7857142857142856rem + 5.714285714285714vw,
      3.125rem
    );
    border-radius: 10px;
    border: none;
    background-color: var(--button);
    color: var(--textOnButton);
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    margin-left: 10px;
    padding: 5px;
  }

  a {
    text-decoration: none;
    color: var(--textOnButton);
  }
  a:visited {
    color: var(--textOnButton);
  }
`;
