import styled, { css } from 'styled-components';

export const WideButton = styled.div`
  background-color: var(--button);
  width: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  margin-inline-end: 15px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  text-align: center;
  gap: 10px;
  justify-content: center;
  align-items: baseline;

  height: 50px;
  color: var(--textOnButton);

  p {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.2rem;
  }

  &:hover {
    background-color: var(--hoverButton);
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: var(--textOnButton);
  }
  a:visited {
    color: var(--textOnButton);
  }
`;
