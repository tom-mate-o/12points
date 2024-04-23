import styled, { css } from 'styled-components';

export const VoteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--textInContainer);
  margin-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;

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
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: var(--textOnButton);
  }
  a:visited {
    color: var(--textOnButton);
  }
`;
