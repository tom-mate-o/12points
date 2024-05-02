import styled, { css } from 'styled-components';

export const SubmitButton = styled.div`
  button {
    background-color: var(--button);

    margin-top: 30px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: auto;
    color: var(--textOnButton);
    text-align: center;
    width: 100%;
    border: none;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1rem;

    &:hover {
      background-color: var(--hoverButton);
      cursor: pointer;
    }
  }
`;
