import styled, { css } from 'styled-components';

export const FriendListGrid = styled.div`
  border-radius: 15px;
  margin-top: 10px;
  width: 100%;
  color: var(--textOnDark);
  font-weight: 300;

  display: grid;

  grid-template-columns: 1fr 4fr 2fr;
  grid-template-rows: auto;
  gap: 10px;
  justify-items: flex-start;
  align-items: center;

  img {
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }

  .avatar {
    grid-column: 1 / 2;
  }

  .name {
    grid-column: 2 / 3;
    font-size: 1.1em;
    font-weight: 700;
    text-align: left;
  }

  .buttonContainer {
    grid-column: 3 / 4;
    width: 150px;
    text-align: right;
    font-size: 0.8em;
    font-weight: 300;
    display: flex;
    justify-content: left;

    button {
      background-color: var(--button);
      border: none;
      border-radius: 10px;
      color: var(--textOnDark);
      font-size: 2em;
      font-weight: 300;
      padding: 5px 10px;
      margin: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
